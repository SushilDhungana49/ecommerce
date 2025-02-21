import React from "react";
import "./Navbar.css";
import navLogo from "../../assets/nav-logo.svg";
import navProfile from "../../assets/nav-profile.svg";

const Navbar = ({ setToken }) => {
  return (
    <div className="navbar">
      <img src={navLogo} alt="" className="nav-logo" />
      <button className="btn logout" onClick={() => setToken("")}>
        Logout
      </button>{" "}
    </div>
  );
};

export default Navbar;
