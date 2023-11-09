import "./NavbarStuff.css";
import React from 'react';
import axios from 'axios';

// file state code from: https://www.geeksforgeeks.org/file-uploading-in-react-js/
// fixing input file tag from: https://jsfiddle.net/4cwpLvae/

class NavbarStuff extends React.Component {
  // file state
  state = {
    // Initially, no file is selected
    selectedFile: null
};

// On file select (from the pop up)
onFileChange = event => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
    // create a formData to format the file for sending to the server
    const fileData = new FormData();
    // populate the formData object
    fileData.append("file", event.target.files[0]);
    // post it using axios and console.log the response
    // you should see the file you uploaded in flask_server/file_upload now
    axios.post("http://localhost:8080/upload", fileData)
    .then((response) => {
      console.log(response)
    })
  };

render () {
  return (
    <nav className="navbar">
      <div className="navbar-shape" />
      <div className="download-pdf">download pdf</div>
      <button className="download-file-image" id="download_button" />
      <img className="status-image-icon" alt="" src="/status-image@2x.png" />
      <div className="working">working...</div>
      <div className="upload-your-wav">Upload your .wav file</div>
      <label for="file-upload" className="upload-file-image" id="upload_button"/>     
      <form method="POST" enctype="multipart/form-data">
      <input type="file" id="file-upload" accept=".wav" onChange={this.onFileChange}/>
      </form>
    </nav>
  );
}
};

export default NavbarStuff;
