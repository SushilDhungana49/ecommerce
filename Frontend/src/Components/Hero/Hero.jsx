import React from "react";
import "./Hero.css";
import arrow from "../../Assets/Frontend_Assets/arrow.png";
import hero from "../../Assets/Frontend_Assets/hero_image.png";
import { Link } from "react-scroll";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2> New Arrivals ✨</h2>
        <h1>New Winter Collection Available For Everyone</h1>
        <Link to="latestCollection" smooth>
          <button className="latest-collection btn">
            <p>Latest collection </p>
            <img className="arrow" src={arrow} />
          </button>
        </Link>
      </div>
      <div className="hero-right">
        <img src={hero} className="hero-image"></img>
      </div>
    </div>
  );
};

export default Hero;
