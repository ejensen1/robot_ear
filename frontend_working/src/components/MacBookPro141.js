import NavbarStuff from "./NavbarStuff";
import RoboearCard from "./RoboearCard";
import Popup from "./Popup"
import {useState} from 'react';
import "./MacBookPro141.css";
import axios from "axios";

const MacBookPro141 = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopup2, setButtonPopup2] = useState(false);

  const [TimedPopup, setTimedPopup] = useState(false);

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
        
        <button className="about-us" >About us</button>
      </div>
      <RoboearCard />
    </div>
  );
};

export default MacBookPro141;
