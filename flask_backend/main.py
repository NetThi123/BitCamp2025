from flask import Flask, send_from_directory

app = Flask(__name__, static_folder="../my-app/dist", static_url_path="")

@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/<path:path>")
def static_proxy(path):
    return send_from_directory(app.static_folder, path)

# Your API routes would be prefixed, like:
@app.route("/api/get_colleges")
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



app.run()