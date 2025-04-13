from flask import Flask, Blueprint, current_app
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import subprocess
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()
# mongo_uri = os.getenv("MONGO_URI")
mongo_uri = "mongodb+srv://bitcamp2025hacakthon:HcjMIS1DpOsYwhNh@user-info.o9eojel.mongodb.net/?retryWrites=true&w=majority&appName=User-Info"
client = MongoClient(mongo_uri)
api_blueprint = Blueprint('api', __name__)

# creates folder to store files
UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# This is an API route that always returns the same thing:
@api_blueprint.route("/api/get_colleges", methods=['GET'])
@jwt_required()
def get_colleges():
    current_user = get_jwt_identity()
    colleges_collection = client["UserInfo"]["loginInfo"]  # your DB and collection
    colleges = list(colleges_collection.find({}, {"_id": 0}))  # exclude Mongo's _id
    cl = None
    for entry in colleges:
        if entry["username"] == current_user:
            cl = entry["universities"]

    return jsonify({"colleges": cl})

@api_blueprint.route("/api/add_college", methods=['POST'])
@jwt_required()
def add_college():
    user_collection = client["UserInfo"]["loginInfo"]
    username = get_jwt_identity()


    data = request.get_json()
    new_college = data.get("college")

    # Check for missing data
    if not (username and new_college):
        return jsonify({"error": "Missing username or college"}), 400

    # Get user document
    user_doc = user_collection.find_one({"username": username})
    if not user_doc:
        return jsonify({"error": "User not found"}), 404

    # Check if new_college already exists
    existing_unis = user_doc.get("universities", [])
    if new_college in existing_unis:
        return jsonify({"message": f"{new_college} already exists in your list."}), 408

    print(f"adding {new_college}")
    # Add the new college
    user_collection.update_one(
        {"username": username},
        {"$push": {"universities": new_college}}
    )

    return jsonify({"message": f"{new_college} added successfully."}), 200



# This is an API route that returns something depending on the user (protected means login required):
@api_blueprint.route('/api/protected', methods=['GET'])
@jwt_required()
def protected():
    # current_user will be the username of the currently logged in user.
    current_user = get_jwt_identity()

    print(f"current user: {current_user}") # log it
    
    # In this case, just return a hello message with their name.
    return jsonify({"message": f"Hello {current_user}, you accessed a protected route!"})

# This is an API route that always returns the same thing:
@api_blueprint.route("/api/upload_file", methods=['POST'])
@jwt_required()
def upload_file():
    print(2)
    current_user = get_jwt_identity()
    print(3)
    print(request.files)
    print(request.form.get('school'))

    file = request.files.get("file")
    print(4)

    if not file or file.filename == '':
        return {"error": "No file uploaded."}, 400
    
    
    existing_files = os.listdir(UPLOAD_FOLDER)
    file_id = len(existing_files) + 1
    saved_filename = f"{file_id}.png"

    file.save(os.path.join(UPLOAD_FOLDER, saved_filename))

    users = client["UserInfo"]["loginInfo"]  # your DB and collection
    users.update_one(
        {"username": current_user},  # or use _id if preferred
        {"$push": {"files": {"id": file_id, "school": request.form.get('school')}}}  # just the number
    )

    return jsonify({"message": f"Success"})

   

@api_blueprint.route('/api/get_me_data', methods=['GET'])
@jwt_required()
def get_me_data():
    current_user = get_jwt_identity()
    colleges_collection = client["UserInfo"]["loginInfo"]  # your DB and collection
    colleges = list(colleges_collection.find({}, {"_id": 0}))  # exclude Mongo's _id
    cl = None
    for entry in colleges:
        if entry["username"] == current_user:
            cl = entry["me"]
    
    return jsonify(cl)
    

@api_blueprint.route('/api/set_me_data', methods=['POST'])
@jwt_required()
def set_me_data():
    current_user = get_jwt_identity()
    me_data = request.get_json()

    if not me_data:
        return jsonify({"error": "No data provided"}), 400

    colleges_collection = client["UserInfo"]["loginInfo"]

    result = colleges_collection.update_one(
        {"username": current_user},
        {"$set": {"me": me_data}}
    )

    if result.matched_count == 0:
        return jsonify({"error": "User not found"}), 404

    return jsonify({"message": "Me data updated successfully"}), 200

@api_blueprint.route('/api/login', methods=['POST'])
def login():
    print("start")
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    c = client["UserInfo"]["loginInfo"]

    # Find the user by username
    user = c.find_one({"username": username})
    print(username, password, user)

    if not user:
        return jsonify({"error": "Invalid username or password"}), 401
    
    if user["password"] != password:
        return jsonify({"error": "Invalid username or password"}), 401
    
    access_token = create_access_token(identity=username)
    return jsonify({"success": True, "token": access_token})

@api_blueprint.route('/api/signup', methods=['POST'])
def signup():
    print("start")
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    c = client["UserInfo"]["loginInfo"]

    # Find the user by username
    user = c.find_one({"username": username})
    print(username, password, user)

    if user:
        return jsonify({"error": "Invalid username or password"}), 401

    #hashed_password = generate_password_hash(password)   <-------- HASH!
    hashed_password = password

    x = c.insert_one({"username": username, "password": password, "universities": [], "files": [], "me": {
        "age": "", "careerInterests": "", "educationLevel": "", "ethnicity": "", "gender": "", "graduationDate": "",
        "interests": "", "major": "", "name": "", "pronouns": ""}
    })

    print(x)

    return jsonify({"success": True, "message": "User created successfully."})

"""
@api_blueprint.route("/api/start_chat", methods=["POST"])
@jwt_required()
def send_chat():
    data = request.get_json()
    current_user = get_jwt_identity()

    print(f"User said: {message}")
    return jsonify({"reply": f"Echo: {message}"})"""
