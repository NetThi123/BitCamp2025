#from google import genai
#from google.genai import types
import google.genai as genai
from google.genai import types
import PIL.Image
from .api import client as db_client

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

def initial_prompt(username):
     colleges_collection = db_client["UserInfo"]["loginInfo"]  # your DB and collection
     colleges = list(colleges_collection.find({}, {"_id": 0}))  # exclude Mongo's _id
     cl = None
     for entry in colleges:
          if entry["username"] == username:
               cl = entry
     if cl == None:
          raise ValueError
     
     me = cl["me"]
     x = "Hello. I am your initial prompter, and I will be speaking with you briefly before putting you directly in contact with a user. For today, you are a financial advisor who is helping a student decide where they will be attending college based primarily on the financial factors involved. I will soon upload some files pertaining to their offers to attend various universities. Once I have uploaded all these files, you will then be talking to the student. Be respectful and help them make a wise financial decision about where they should attend university. They also filled out some forms before their consultation with you, the data from which I will send now. " + \
     f"\nName: {me['name']}, age: {me['age']}, ethnicity: {me['ethnicity']}, graduation date: {me['graduationDate']}, intended major(s): {me['major']}, gender: {me['gender']}, pronouns: {me['pronouns']}, education level: {me['educationLevel']}. Their 'career interests' answer was: {me['careerInterests']}. Their 'interests' answer was {me['interests']}.\n"
     x += "The colleges they have marked themselves as INTERESTED IN are as follows: "
     for i in range(len(cl['universities'])):
          x += f"{cl['universities'][i]}, "
     x += ".\nThey have also been given the option of attaching their financial aid offers from these universities, as well as any other relevant documentation regarding the financial offers for each university. " + \
     f"They uploaded {len(cl['files'])} images. "
     for i in range(len(cl['files'])):
          x += f"Image #{i} is regarding {cl['files'][i]['school']}. "
     x += "I will now send you those images, if there are any. \n\n"
     x += "After sending all relevant images, I will send the text message 'DONE -- TALK TO THE STUDENT'. When this message is recieved, you will no longer be speaking with me, and instead with the student. Therefore, at that time you should send your initial message to the student, which should describe the likely cost of attendance at the various schools they are considering, as well as your initial thoughts on whether each option makes financial sense, as well as any prompts for further details they could give you to help you make informed advice. Please break this initial response (which may be somewhat long) into 3 short-ish messages, separated by the string '------' (six dashes). Bear in mind, however, that first impressions are everything. Don't just ask questions, make sure you give the student at least SOME numbers/estimates to prove you can be useful. Do you understand all that?"
     print(f"-------------\n{x}\n-------------------")

     return x

@gem_blueprint.route("/api/send_chat", methods=["POST"])
@jwt_required()
def send_chat():
     data = request.get_json()
     message = data.get("message")
     print(f"User {get_jwt_identity()} said: {message}")
     resp = get_user_response(get_jwt_identity(), message)
     print(f"We said: {resp}")
     return jsonify({"reply": resp})

@gem_blueprint.route("/api/start_chat", methods=["GET"])
@jwt_required()
def start_chat():
     print(1)
     current_user = get_jwt_identity()

     r1 = get_user_response(current_user, initial_prompt(current_user))
     print(f"BOT: {r1}")
     
     colleges_collection = db_client["UserInfo"]["loginInfo"]  # your DB and collection
     colleges = list(colleges_collection.find({}, {"_id": 0}))  # exclude Mongo's _id
     cl = None
     for entry in colleges:
          if entry["username"] == current_user:
               cl = entry
     
     # Send files
     for i in range(len(cl['files'])):
          print(get_user_response(current_user, f"uploads/{cl['files'][i]}.png"))

     resp = get_user_response(current_user, "DONE -- TALK TO THE STUDENT")
     print(f"BOT: {resp}")


     print(f"User said: nuthin")
     return jsonify({"reply": resp})