import NavbarStuff from "./NavbarStuff";
import RoboearCard from "./RoboearCard";
import Popup from "./Popup"
import {useState} from 'react';
import "./MacBookPro141.css";

const MacBookPro141 = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopup2, setButtonPopup2] = useState(false);

  const [TimedPopup, setTimedPopup] = useState(false);

  // const [email, setEmail] = useState<string>("");
  // const [password, setPassword] = useState<string>("");

  const logInUser = async () => {
    const emailInput = document.getElementById("Email:"); 
    const passwordInput = document.getElementById("Password"); 

    const email = emailInput.value;
    const password = passwordInput.value;

    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="macbook-pro-14-1">
      <NavbarStuff />

      <div className="signuplogin">
        <button className="sign-uplogin" onClick={() => setButtonPopup(true)}>Sign up/Login</button>
        {/* first pop up */}
        <Popup trigger = {buttonPopup} setTrigger={setButtonPopup}>
          <h1>Log Into Your Account</h1>
            <label for="Email:">Enter your email:</label>
            <input type="text" id="email" required></input>
            <p></p>
            <label>Password: </label>      
            <input type="text" id="password" required></input>
            <p></p>

          <button type="button" onClick={() => logInUser}>Submit</button>

          <button className="Sign Up" onClick={() => setButtonPopup2(true)} >Sign Up</button>

        </Popup>
        {/* second pop up */}
        <Popup trigger = {buttonPopup2} setTrigger={setButtonPopup2}>
          <h1>Create an Account</h1>

            <label for="Email:">Enter your email:</label>
            <input type="text" id="email" required></input>
            <br></br>
            <label>Enter your Password: </label>      
            <input type="text" id="password" required></input>
            <br></br>
          <button type="button" onClick={() => logInUser}>Submit</button>
        </Popup>
        
        <button className="about-us" >About us</button>
      </div>
      <RoboearCard />
    </div>
  );
};

export default MacBookPro141;
