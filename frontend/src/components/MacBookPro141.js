import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./MacBookPro141.css";

const MacBookPro141 = () => {
  const navigate = useNavigate();

  const onSignUpLoginClick = useCallback(() => {
    navigate("/login-popup");
  }, [navigate]);

  return (
    <div className="macbook-pro-14-1">
      <nav className="navbar">
        <div className="navbar-shape" />
        <div className="download-pdf">download pdf</div>
        <button className="download-file-image" id="download_button" />
        <img className="status-image-icon" alt="" src="/status-image@2x.png" />
        <div className="working">working...</div>
        <div className="upload-your-wav">Upload your .wav file</div>
        <button className="upload-file-image" id="upload_button" />
      </nav>
      <div className="signuplogin">
        <button className="sign-uplogin" onClick={onSignUpLoginClick}>
          Sign up/Login
        </button>
        <button className="about-us">About us</button>
      </div>
      <div className="title" id="title">
        <img className="music-icon1" alt="" src="/music-icon1@2x.png" />
        <img className="music-icon2" alt="" src="/music-icon2@2x.png" />
        <img className="title-child" alt="" src="/ellipse-1@2x.png" />
        <div className="roboear">ROBOEAR</div>
        <div className="by-robobabies">BY: ROBOBABIES</div>
      </div>
    </div>
  );
};

export default MacBookPro141;
