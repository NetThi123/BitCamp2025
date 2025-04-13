from flask import Flask, Blueprint
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import subprocess

# Simulate a simple user "database"
users_db = {}

auth_blueprint = Blueprint('auth', __name__)


@auth_blueprint.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if username in users_db:
        return jsonify({"success": False, "message": "Username already exists."}), 400

    #hashed_password = generate_password_hash(password)   <-------- HASH!
    hashed_password = password
    users_db[username] = hashed_password
    return jsonify({"success": True, "message": "User created successfully."})

@auth_blueprint.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    stored_password = users_db.get(username)
    #if stored_password and check_password_hash(stored_password, password):   <-------- HASH!
    if stored_password and stored_password == password:
        access_token = create_access_token(identity=username)
        return jsonify({"success": True, "token": access_token})

    return jsonify({"success": False, "message": "Invalid credentials."}), 401