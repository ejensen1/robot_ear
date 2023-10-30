import "./NavbarStuff.css";
import React from 'react';

// file state code from: https://www.geeksforgeeks.org/file-uploading-in-react-js/
// fixing input file tag from: https://jsfiddle.net/4cwpLvae/

class NavbarStuff extends React.Component {
  state = {
 
    // Initially, no file is selected
    selectedFile: null
};

// On file select (from the pop up)
onFileChange = event => {

    // Update the state
    this.setState({ selectedFile: event.target.files[0] });

};

fileData = () => {
  if (this.state.selectedFile) {
    var fname = this.state.selectedFile.name;
    alert("file selected is: " + fname);
  }
}
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
      <input type="file" id="file-upload" accept=".wav" onChange={this.onFileChange}/>
      {this.fileData()}
    </nav>
  );
}
};

export default NavbarStuff;
