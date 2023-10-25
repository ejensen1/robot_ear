import "./NavbarStuff.css";

const NavbarStuff = () => {
  return (
    <nav className="navbar">
      <div className="navbar-shape" />
      <div className="download-pdf">download pdf</div>
      <button className="download-file-image" id="download_button" />
      <img className="status-image-icon" alt="" src="/status-image@2x.png" />
      <div className="working">working...</div>
      <div className="upload-your-wav">Upload your .wav file</div>
      <button className="upload-file-image" id="upload_button" />
    </nav>
  );
};

export default NavbarStuff;
