import React from "react";
import "./Footer.css";
import icon from "../../Assets/Frontend_Assets/logo.png";
import instagram_icon from "../../Assets/Frontend_Assets/instagram_icon.png";
import pinterest_icon from "../../Assets/Frontend_Assets/pinterest_icon.png";
import whatsapp_icon from "../../Assets/Frontend_Assets/whatsapp_icon.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="title">
        <img src={icon}></img>
        <h1>Shopper</h1>
      </div>
      <div className="menu">
        <ul>
          <li>Company</li>
          <li>Products</li>
          <li>Branches</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className="socials">
        <ul>
          <li>
            <img src={instagram_icon}></img>
          </li>
          <li>
            <img src={pinterest_icon}></img>
          </li>
          <li>
            <img src={whatsapp_icon}></img>
          </li>
        </ul>
      </div>
      <p className="copyright">
        Copyright &copy; {new Date().getFullYear()} - All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
