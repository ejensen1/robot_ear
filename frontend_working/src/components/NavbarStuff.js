import "./NavbarStuff.css";
import React from 'react';
import axios from 'axios';
import { useState } from "react";

// file state code from: https://www.geeksforgeeks.org/file-uploading-in-react-js/
// fixing input file tag from: https://jsfiddle.net/4cwpLvae/
// html2pdf library: https://github.com/parallax/jsPDF

class NavbarStuff extends React.Component {
  state = {
    showNotes: false,
    selectedFile: null,
    notes_string: null
  };

  sheetClick = event => {
    this.setState({showNotes: true})
  }

  displayNotes = () => {
    if (this.state.showNotes) {
      console.log(this.state.selectedFile.name)
      axios
       .get(`http://localhost:8080/download?name=${this.state.selectedFile.name}`)
       .then((response) => {
        this.pdfer(response.data);
        var notes_string = response.data

       })
      }
    }

    pdfer = (notes_string) => {
      console.log(notes_string)
      var fix_notes = notes_string + "/w";
      console.log(fix_notes);
      const { Factory, EasyScore, System } = Vex.Flow;
      const vf = new Factory({renderer: { elementId: 'output', width: 500, height: 200 },});
      const score = vf.EasyScore();
      const system = vf.System();
      system
      .addStave({
        voices: [
          score.voice(score.notes(fix_notes, { stem: 'up' })),
        ],
      })
      .addClef('treble')
      .addTimeSignature('4/4');
      vf.draw();
      const element = document.getElementById("output");

    // Create a configuration object
    const opt = {
        margin:       10,
        filename:     'musicSheet.pdf',
        image:        { type: 'pdf', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Use html2pdf library to generate PDF
    html2pdf(element, opt);
}

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
    <div>
    <nav className="navbar">
      <div className="navbar-shape" />
      <div className="download-pdf">download pdf</div>
      <button className="download-file-image" id="download_button" onClick={this.sheetClick} />
      <img className="status-image-icon" alt="" src="/status-image@2x.png" />
      <div className="working">working...</div>
      <div className="upload-your-wav">Upload your .wav file</div>
      <label for="file-upload" className="upload-file-image" id="upload_button"/>     
      <form method="POST" enctype="multipart/form-data">
      <input type="file" id="file-upload" accept=".wav" onChange={this.onFileChange}/>
      </form>
    </nav>
    <div class="flex-containter">
    <div id="output" src="https://unpkg.com/vexflow/releases/vexflow-debug.js" async></div>
    {this.displayNotes()}
    </div>
    </div>
  );
}

};

export default NavbarStuff;