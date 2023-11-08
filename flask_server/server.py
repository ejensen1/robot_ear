from flask import Flask, request, session, json, jsonify
import os
from flask_cors import CORS
from werkzeug.utils import secure_filename 

UPLOAD_FOLDER = 'file_upload'

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/")
def hello_world():
    print("hello world\n")
    return "<p>Hello, World!</p>"

@app.route("/members")
def members():
    return {"members": ["rishita","tanya","melany"]}

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
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        success = True
    else:
        resp = jsonify({
            "message": 'File type is not allowed',
            "status": 'failed'
        })
        return resp
         
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

    # filename = secure_filename(file.filename) 
    # file.save(os.path.join(app.config['UPLOAD_FOLDER']), filename)
    # return '''
    # <!doctype html>
    # <title>Upload new File</title>
    # <h1>Upload new File</h1>
    # <form method=post enctype=multipart/form-data>
    #   <input type=file name=file>
    #   <input type=submit value=Upload>
    # </form>
    # '''
    #filename = secure_filename(file.filename)

if __name__ == "__main__": 
    #app.secret_key = os.urandom(24)
    app.run(port=8080, debug=True)

#flask_cors.CORS(app, expose_headers='Authorization')