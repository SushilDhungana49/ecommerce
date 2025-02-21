import React, { useState, useContext } from "react";
import logo from "../../Assets/Frontend_Assets/logo.png";
import cart from "../../Assets/Frontend_Assets/cart_icon.png";
import { Link, useLocation } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import "./Navbar.css";

const Navbar = () => {
  const [hr, setHr] = useState("shop");
  const location = useLocation();

  const addHr = () => {};
  const { getTotalItems } = useContext(ShopContext);
  return (
    <>
      <div className="navbar">
        <Link to="/">
          <div className="title">
            <img src={logo} alt="logo"></img>
            <h1>Shopper</h1>
          </div>
        </Link>
        <div className="menu">
          <ul>
            <li onClick={() => setHr("shop")}>
              {" "}
              <Link style={{ textDecoration: "none", color: "black" }} to="/">
                Shop{" "}
              </Link>
              {location.pathname === "/" ? <hr /> : <></>}
            </li>
            <li onClick={() => setHr("men")}>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/men"
              >
                {" "}
                Men
              </Link>
              {location.pathname === "/men" ? <hr /> : <></>}
            </li>
            <li onClick={() => setHr("women")}>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/women"
              >
                {" "}
                Women
              </Link>
              {location.pathname === "/women" ? <hr /> : <></>}
            </li>
            <li onClick={() => setHr("kids")}>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/kids"
              >
                {" "}
                Kids
              </Link>
              {location.pathname === "/kids" ? <hr /> : <></>}
            </li>
          </ul>
        </div>
        <div className="nav-right">
          {localStorage.getItem("token") ? (
            <button
              className="login btn-gray"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.replace("/");
              }}
            >
              Logout{" "}
            </button>
          ) : (
            <Link to="/login">
              <button className="login btn-gray">Login</button>
            </Link>
          )}

          <div className="cart">
            <Link to="/cart">
              {" "}
              <img src={cart} alt="cart" className="cart-logo"></img>
            </Link>
            <p className="cart-count">{getTotalItems()}</p>
          </div>
        </div>
      </div>
      <hr></hr>
    </>
  );
};

export default Navbar;
