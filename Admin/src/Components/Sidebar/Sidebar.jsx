import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import add_product_icon from "../../assets/Product_Cart.svg";
import list_product_icon from "../../assets/Product_list_icon.svg";
import subscriber_icon from "../../assets/subscriber_icon.png";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link
        to={"/addproduct"}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="sidebar-item">
          <img src={add_product_icon} alt="" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link
        to={"/listproduct"}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="sidebar-item">
          <img src={list_product_icon} alt="" />
          <p>Product List</p>
        </div>
      </Link>
      <Link to={"/orders"} style={{ textDecoration: "none", color: "black" }}>
        <div className="sidebar-item">
          <img src={list_product_icon} alt="" />
          <p>Orders</p>
        </div>
      </Link>
      <Link
        to={"/subscribers"}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="sidebar-item">
          <img src={subscriber_icon} alt="" />
          <p>Subscribers</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
