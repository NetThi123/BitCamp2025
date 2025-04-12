from flask import Flask, Blueprint, current_app
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import subprocess

api_blueprint = Blueprint('api', __name__)

# This is an API route that always returns the same thing:
@api_blueprint.route("/api/get_colleges")
def get_colleges():
    
    return {"colleges": [
        {
            "name": "University of Maryland: College Park",
            "admitted": True,
            "files_uploaded": 2,
        },

        {
            "name": "University of North Carolina: Chapel Hill",
            "admitted": False,
            "files_uploaded": 0,
        }
    ]}

# This is an API route that returns something depending on the user (protected means login required):
@api_blueprint.route('/api/protected', methods=['GET'])
@jwt_required()
def protected():
    # current_user will be the username of the currently logged in user.
    current_user = get_jwt_identity()

    print(f"current user: {current_user}") # log it
    
    # In this case, just return a hello message with their name.
    return jsonify({"message": f"Hello {current_user}, you accessed a protected route!"})
