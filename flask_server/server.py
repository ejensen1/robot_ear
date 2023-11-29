# upload endpoint function from : https://tutorial101.blogspot.com/2023/04/react-js-and-python-flask-multiple.html
from flask import Flask, request, session, json, jsonify
import os
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename 
from models import db, User
from flask_bcrypt import Bcrypt
from flask_session import Session
from config import ApplicationConfig
from flask_sqlalchemy import SQLAlchemy

UPLOAD_FOLDER = 'file_upload'

# db = SQLAlchemy()

app = Flask(__name__)
app.secret_key = "7IcSD1SXDzr2V2G1mwFmM4PuI5bEiYIb"
# Authorization for the Post Request
CORS(app, supports_credentials=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
# server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()

# when the server is started http://localhost:8080 should say hello world
@app.route("/")
def hello_world():
    print("hello world\n")
    return "<p>Hello, World!</p>"

# test endpoint
@app.route("/members")
def members():
    return {"members": ["rishita","tanya","melany"]}

# uploading .wav file that goes into file_upload folder for backend to use
@app.route("/upload", methods=["POST"])
def upload_file():
    # check if the post request has the file part
    if 'file' not in request.files:
        resp = jsonify({
            "message": 'No file part in the request',
            "status": 'failed'
        })
        resp.status_code = 400
        return resp
  
    file = request.files['file']
      
    errors = {}
    success = False
           
    if file:
        # grab file name
        filename = secure_filename(file.filename)
        # save the file to the file_upload folder
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        success = True
    else:
        resp = jsonify({
            "message": 'File type is not allowed',
            "status": 'failed'
        })
        return resp

    # responses to send back     
    if success and errors:
        errors['message'] = 'File(s) successfully uploaded'
        errors['status'] = 'failed'
        resp = jsonify(errors)
        resp.status_code = 500
        return resp
    if success:
        resp = jsonify({
            "message": 'Files successfully uploaded',
            "status": 'successs'
        })
        resp.status_code = 201
        return resp
    else:
        resp = jsonify(errors)
        resp.status_code = 500
        return resp

@app.route("/register", methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })

@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
    
    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "email": user.email
    })

# @app.route("/logout", methods=["POST"])
# def logout_user():
#     session.pop("user_id")
#     return "200"

# @app.route("/members")
# def members():
#     return {"members": ["rishita","tanya","melany"]}

if __name__ == "__main__": 
    app.run(port=8080, debug=True)
