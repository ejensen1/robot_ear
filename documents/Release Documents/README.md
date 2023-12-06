Steps to run this project:
1.) `cd flask_server`
2.) follow the README.md steps inside to start the backend
3.) open a new terminal and `cd frontend_working`
4.) follow the README.md inside the folder to start the frontend
5.) follow the user_guide in the documents folder on the github

Frontend

  # roboear_web

  Note: Please ensure you have installed <code><a href="https://nodejs.org/en/download/">nodejs</a></code>

  To preview and run the project on your device:
  1) Open project folder in <a href="https://code.visualstudio.com/download">Visual Studio Code</a>
  2) In the terminal, run `npm install` (if there is a dependency error with vexflow run `npm install --legacy-peer-deps`)
  3) `npm install axios`
  4) Run `npm start` to view project in browser 

Backend

1) To run the server, run `. venv/bin/activate` to activate the environment
2) run `pip3 install -r ./requirements.txt` this installs all modules for server.py
3.) `pip3 install librosa` for segmenter & frequency classifier
4.) `pip3 install matplotlib` 
5.) `pip3 install numpy`
6.) `python3 server.py` launches the server on port 8080