# upload endpoint function from : https://tutorial101.blogspot.com/2023/04/react-js-and-python-flask-multiple.html

from flask import Flask, request, session, json, jsonify
import os
from flask_cors import CORS
from werkzeug.utils import secure_filename 

UPLOAD_FOLDER = 'file_upload'

app = Flask(__name__)
# Authorization for the Post Request
CORS(app, supports_credentials=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

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

if __name__ == "__main__": 
    app.run(port=8080, debug=True)
