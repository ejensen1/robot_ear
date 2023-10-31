from flask import Flask

app = Flask(__name__)


@app.route("/members")
def members():
    return {"members": ["rishita","tanya","melany"]}


if __name__ == "__main__": 
    app.run(port=8080, debug=True)
