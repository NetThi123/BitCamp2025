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

@api_blueprint.route("/api/add_college", methods=['Get'])
def add_colleges():
    colleges_collection = client["UserInfo"]["loginInfo"]  # your DB and collection
    colleges = list(colleges_collection.find({}, {"_id": 0}))
    found = False
    for entry in colleges:
        if entry["username"] == "disha":
            for uni in entry["universities"]:
                print(uni)
                if uni == "Arizona State University":
                    found = True

    return jsonify({"unis": x["universities"]})

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
    
    if not (file.filename.lower().endswith('.pdf') or file.filename.lower().endswith('.doc') or file.filename.lower().endswith('.docx')):
        return {"error": "Only PDF files allowed."}, 400
    
    existing_files = os.listdir(UPLOAD_FOLDER)
    file_id = len(existing_files) + 1
    saved_filename = f"{file_id}.pdf"

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

