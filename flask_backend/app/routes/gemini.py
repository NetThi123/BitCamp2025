#from google import genai
#from google.genai import types
import google.genai as genai
from google.genai import types
import PIL.Image

from flask import Flask, Blueprint, current_app
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import subprocess

gem_blueprint = Blueprint('gem', __name__)

# Initialize Gemini with your API key
#genai.configure(api_key='AIzaSyAxT73qJEy5lLt0hvsy6UN4grH-3eSTqpw')

# Use Gemini 1.5 or any other model
print("INITIALIZING CLIENT")
client = genai.Client(api_key='AIzaSyAxT73qJEy5lLt0hvsy6UN4grH-3eSTqpw')
#model = genai.GenerativeModel("gemini-2.0-flash")

#image = PIL.Image.open('offer1.png')

# Store individual user chats (context) in a dictionary
user_sessions = {}

def get_user_response(user_id, user_message):
    # Start a new session for new users
    if user_id not in user_sessions:
        #user_sessions[user_id] = model.start_chat()
        user_sessions[user_id] = client.chats.create(model='gemini-2.0-flash')


    # Get that user's session
    chat = user_sessions[user_id]
    
    # Send message and get response
    response = chat.send_message(user_message)
    
    return response.text

# Simulating two users:
"""print("User1:", get_user_response("user1", "My name is Brian. What is my name?"))
print("User2:", get_user_response("user2", "My favorite color is red. What is my name?"))
print("User1:", get_user_response("user1", "What is my name?"))
print("User2:", get_user_response("user2", "What is my name?"))

print(get_user_response("user1", "What is my name?"))
print(get_user_response("user2", "What is my name?"))
print(get_user_response("user3", "What is my name?"))
print(get_user_response("user4", "What is my name?"))
print(get_user_response("user5", "What is my name?"))"""
"""
print(get_user_response("user1", "Hello. For today, you are a financial advisor who is helping a student decide where they will be attending college based primarily on the financial factors involved. I will upload some files pertaining to their offer to attend the University of Maryland, in College Park. Once I have uploaded all these files, you will then be talking to the student. Be respectful and help them make a wise financial decision about whether they should accept their offer to attend the University of Maryland. After sending all relevant images, I will send the text message 'DONE -- TALK TO THE STUDENT'. When this message is recieved, send your initial message to the student, which should describe the likely cost of attendance at the University of Maryland, as well as your initial thoughts on whether it makes financial sense, as well as any prompts for further details they could give you to help you make informed advice. Do you understand all that?"))
print(get_user_response("user1", image))
print(get_user_response("user1", "DONE -- TALK TO THE STUDENT"))
print(get_user_response("user1", "my family is poor and indian. does this change things"))
"""

@gem_blueprint.route("/api/send_chat", methods=["POST"])
@jwt_required()
def send_chat():
    data = request.get_json()
    message = data.get("message")
    print(f"User said: {message}")
    resp = get_user_response(get_jwt_identity(), message)
    print(f"We said: {resp}")
    return jsonify({"reply": resp})