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
