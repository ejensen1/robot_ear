import "./NavbarStuff.css";
import React from 'react';
import axios from 'axios';

// file state code from: https://www.geeksforgeeks.org/file-uploading-in-react-js/
// fixing input file tag from: https://jsfiddle.net/4cwpLvae/

class NavbarStuff extends React.Component {
  state = {
 
    // Initially, no file is selected
    selectedFile: null
};

// On file select (from the pop up)
onFileChange = event => {
    console.log("here")
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
    const fileData = new FormData();
    fileData.append("file", event.target.files[0]);
    axios.post("http://localhost:8080/upload", fileData)
    .then((response) => {
      console.log(response)
    })
  };
    //fileData.append("filename", event.target.files[0]);
    // fetch("http://localhost:8080/members",{
    //   mode: 'no-cors'
    // }).then(
    //   res => res.json()
    // ).then(
    //   data => {
    //     setData(data)
    //     console.log(data)
    //   }
    // )


//  getData = () => {
//    if (this.state.selectedFile) {
//     const fileData = new FormData();
//     fileData.append("file", this.state.selectedFile);
//     fileData.append("filename", this.state.selectedFile.name);
//     console.log(fileData.get("file"));
//     console.log(fileData.get("filename"));
  
//     // axios.post("api/upload", fileData);
//     fetch('/upload', {
//       method: 'POST',
//       body: fileData,
//     })
//       .then(response => {
//         if (response.ok) {
//           return response.text();
//         } else {
//           throw new Error('File upload failed');
//         }
//       })
//       .then(data => {
//         console.log(data); // Handle the response from the Flask server
//       })
//       .catch(error => {
//         console.error(error);
//       });
//     // fetch('/upload', {
//     //   method: "POST",
//     //   body: fileData,
//     // }).then((response) => {
//     //   response.text().then(data => alert(data));
//     // });
//     //  var fname = this.state.selectedFile.name;
//     //  alert("file selected is: " + fname);
//    }
// }
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
