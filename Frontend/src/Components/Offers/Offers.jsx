import React from "react";
import "./Offers.css";
import offersImage from "../../Assets/Frontend_Assets/exclusive_image.png";
import { Link } from "react-scroll";

const Offers = () => {
  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Exclusive Offers For You</h1>
        <p>On Best Selling Products</p>
        <Link to="bestsellingProduct" smooth>
          {" "}
          <button className="btn">Check Now</button>{" "}
        </Link>
      </div>
      <div className="offers-right">
        <img src={offersImage} className="offers-image"></img>
      </div>
    </div>
  );
};

export default Offers;
