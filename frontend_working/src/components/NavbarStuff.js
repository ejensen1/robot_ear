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
    var change_status = document.getElementsByClassName("status");
    for (var i = 0; i < change_status.length; i++) {
      change_status[i].innerHTML = "downloading...";
    }
    if (this.state.showNotes) {
      console.log(this.state.selectedFile.name)
      axios
       .get(`http://localhost:8080/download?name=${this.state.selectedFile.name}`)
       .then((response) => {
        console.log(response.data)
        this.pdfer(response.data);
        //var notes_string = response.data

       })
      }
    }

    pdfer = (listOfNoteStrings) => {
      listOfNoteStrings = [
        '(C0/q, A0, A4, A3)',
        '(A#1/q, D3, D1, D2)',
        '(G1/q, C3, A1, G2)',
        '(F1/q, F3, C1, C2)',
        '(C1/q, C3, E1, E2)'
        // Add more note strings as needed
      ];
      //console.log(notes_string)
      const { Factory } = Vex.Flow;
      const vf = new Factory({renderer: { elementId: 'output'} });
      const score = vf.EasyScore();
      const system = vf.System();

      const staveWidth = 500; // Width of the staves
      let currentY = 10; // Initial Y position
      let staveIndex = 0;
      let staves = [];

      for (let i = 0; i < listOfNoteStrings.length; i += 4) {
        const notes = [];

      for (let j = i; j < i + 4 && j < listOfNoteStrings.length; j++) {
        const noteString = listOfNoteStrings[j];
        console.log(noteString.replace(/[()]/g, ''))
        const note = score.notes(noteString.replace(/[()]/g, ''), { stem: 'up' });
        notes.push(score.voice(note));
      }

      staves[staveIndex] = system.addStave({
        voices: notes
      }).addClef('treble').addTimeSignature('4/4').setContext(vf.getContext());

      staves[staveIndex].setContext(vf.getContext()).draw();
      currentY += 120; // Increase Y position for the next stave
      staveIndex++;
    }
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
    var change_status = document.getElementsByClassName("status"); 
    for (var i = 0; i < change_status.length; i++) {
      change_status[i].innerHTML = "finished!";
    }
}

// On file select (from the pop up)
onFileChange = event => {
  var change_status = document.getElementsByClassName("status"); 
  for (var i = 0; i < change_status.length; i++) {
    change_status[i].innerHTML = "uploading...";
  }
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
      if (response.status == 201) {
        for (var i = 0; i < change_status.length; i++) {
          change_status[i].innerHTML = "press download!";
        }
      } else {
        for (var i = 0; i < change_status.length; i++) {
          change_status[i].innerHTML = "Error!";
        }
      }
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
      <div className="status">upload {'\u2192'} download</div>
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