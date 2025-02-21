import React from "react";
import "./Admin.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import AddProduct from "../../Components/AddProduct/AddProduct";
import ListProduct from "../../Components/ListProduct/ListProduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Orders from "../../Components/Orders/Orders";
import Subscribers from "../../Components/Subscribers/Subscribers";

const Admin = ({ token }) => {
  return (
    <div className="admin">
      <Sidebar />
      {/* <div className="admin-main">
        <h1>Welcome to Admin Panal</h1>
        <div className="admin-options">
          <h2>Add Product</h2>
          <h2>List Product</h2>
          <h2>Manage Orders</h2>
        </div>
      </div> */}
      <Routes>
        <Route
          path="/addproduct"
          element={<AddProduct token={token} />}
        ></Route>
        <Route
          path="/listproduct"
          element={<ListProduct token={token} />}
        ></Route>
        <Route path="/orders" element={<Orders token={token} />}></Route>
        <Route
          path="/subscribers"
          element={<Subscribers token={token} />}
        ></Route>
      </Routes>
    </div>
  );
};

export default Admin;
