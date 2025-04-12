from flask import Flask, send_from_directory

app = Flask(__name__, static_folder="../my-app/dist", static_url_path="")

@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/<path:path>")
def static_proxy(path):
    return send_from_directory(app.static_folder, path)

# Your API routes would be prefixed, like:
@app.route("/api/hello")
def hello():
    
    
    return {"message": "Hi from Flask!"}

app.run()