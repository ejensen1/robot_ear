import NavbarStuff from "./NavbarStuff";
import RoboearCard from "./RoboearCard";
import "./MacBookPro141.css";

const MacBookPro141 = () => {
  return (
    <div className="macbook-pro-14-1">
      <NavbarStuff />
      <div className="signuplogin">
        <button className="sign-uplogin">Sign up/Login</button>
        <button className="about-us">About us</button>
      </div>
      <RoboearCard />
    </div>
  );
};

export default MacBookPro141;
