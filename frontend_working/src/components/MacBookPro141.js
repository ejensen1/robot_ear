import NavbarStuff from "./NavbarStuff";
import RoboearCard from "./RoboearCard";
import Popup from "./Popup"
import {useState} from 'react';
import "./MacBookPro141.css";
import axios from "axios";

const MacBookPro141 = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopup2, setButtonPopup2] = useState(false);
  const [buttonPopup3, setButtonPopup3] = useState(false);

  // const [email, setEmail] = useState<string>("");
  // const [password, setPassword] = useState<string>("");

  const logInUser = async() => {
    console.log("hello")
    const emailInput = document.getElementById("email"); 
    const passwordInput = document.getElementById("password"); 

    const email1 = emailInput.value;
    const password1 = passwordInput.value;

    console.log("Email:", email);
    console.log("Password:", password);

    const userData = new FormData();
    userData.append("email", email1);
    userData.append("password", password1);
    axios.post("http://localhost:8080/login", { email : email1 , password : password1})
    .then((response) => {
      console.log(response)
    })
    //new code to check if a user doesn't exsist
    .catch((error) => { // error is handled in catch block
      if (error.response) { // status code out of the range of 2xx
        console.log("Data :" , error.response.data);
        console.log("Status :" + error.response.status);
        alert("User doesn't exist")
      } else if (error.request) { // The request was made but no response was received
        console.log(error.request);
      } else {// Error on setting up the request
        console.log('Error', error.message);
      }
    });
  };

  const regUser = async() => {
    console.log("hello")
    const emailInput = document.getElementById("new_email"); 
    const passwordInput = document.getElementById("new_password"); 

    const new_email1 = emailInput.value;
    const new_password1 = passwordInput.value;

    console.log("Email:", email);
    console.log("Password:", password);

    axios.post("http://localhost:8080/register", { email : new_email1 , password : new_password1})
    .then((response) => {
      console.log(response)
    })
  };

  return (
    <div className="macbook-pro-14-1">
      <NavbarStuff />

      <div className="signuplogin">
        <button className="sign-uplogin" onClick={() => setButtonPopup(true)}>Sign up/Login</button>
        {/* first pop up */}
        <Popup trigger = {buttonPopup} setTrigger={setButtonPopup}>
          <h1>Log Into Your Account</h1>
            <label for="email:">Enter your email:</label>
            <input type="text" autoComplete="off" id="email" required></input>
            <p></p>
            <label>password </label>      
            <input type="text" autoComplete="off" id="password" required></input>
            <p></p>

          <button type="button" onClick={() => logInUser()}>Submit</button>

          <button className="Sign Up" onClick={() => setButtonPopup2(true)} >Sign Up</button>

        </Popup>
        {/* second pop up */}
        <Popup trigger = {buttonPopup2} setTrigger={setButtonPopup2}>
          <h1>Create an Account</h1>

            <label for="new_email">Enter your email:</label>
            <input type="text" id="new_email" required></input>
            <br></br>
            <label>Enter your Password: </label>      
            <input type="text" id="new_password" required></input>
            <br></br>
          <button type="button" onClick={() => regUser()}>Submit</button>
        </Popup>
        

        <button className="about-us" onClick={() => setButtonPopup3(true)} >About us</button>
        <Popup trigger = {buttonPopup3} setTrigger={setButtonPopup3}>
        <h1>Why we created this app?</h1>
          <p>Musicians want to play the music they love and to do this they need sheet music for it! 
            Currently, softwares that provide the service of music transcription are guarded by paywalls 
            or not usable in app and made user-friendly. Robot Ear is here to change that.  </p>
        </Popup>

        <button className="saved-files" >Saved Files</button>

      </div>
      <RoboearCard />
    </div>
  );
};

export default MacBookPro141;

