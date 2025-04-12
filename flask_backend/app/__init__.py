from flask import Flask, redirect, request, url_for, jsonify, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import subprocess

jwt = None

def create_app(config_filename='config.py'):
    print(subprocess.run("cd .. && cd my-app && npm run build && cd .. && cd flask_backend", shell=True, check=True))

    app = Flask(__name__, static_folder="../../my-app/dist", static_url_path="/static")

    CORS(app)

    global jwt
    jwt = JWTManager(app)

    app.config['JWT_SECRET_KEY'] = 'your_secret_key'  # Change this in production
    app.config.from_pyfile(config_filename)

    # Register Blueprints
    from .routes.api import api_blueprint
    from .routes.auth import auth_blueprint

    @app.route("/")
    def index():
        return redirect("/homepage")

    app.register_blueprint(auth_blueprint, url_prefix="")
    app.register_blueprint(api_blueprint, url_prefix="")


    @app.route('/static/<path:filename>')
    def static_file(filename):
        return send_from_directory(app.static_folder, f'static/{filename}')

    @app.route("/<path:path>", strict_slashes=False)
    def static_proxy(path):
        print(f"Requested path: {path}")

        return send_from_directory(app.static_folder, "index.html")

        full_path = os.path.join(app.static_folder, path)

        # If the requested file exists in the static folder, serve it
        if os.path.exists(full_path) and os.path.isfile(full_path):
            return send_from_directory(app.static_folder, path)

        # Otherwise, serve index.html (for React to handle)
        return send_from_directory(app.static_folder, "index.html")


    for rule in app.url_map.iter_rules():
        print(f"Endpoint: {rule.endpoint} | Methods: {rule.methods} | Rule: {rule}")

    return app