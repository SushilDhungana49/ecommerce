import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";
import { backendUrl } from "../../App";
import { toast } from "react-toastify";

const ListProduct = ({ token }) => {
  const [allProducts, setAllProducts] = useState([]);
  const fetchInfo = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setAllProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchInfo();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.message);
    }
  };
  return (
    <div className="listproduct">
      <h1>Product List</h1>
      <div className="listproduct-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <hr />
      {allProducts.map((e, index) => {
        return (
          <div key={index}>
            <div className="listproduct-main listproduct-product">
              <img src={e.image[0]} className="listproduct-product-icon" />
              <p style={{ textTransform: "capitalize" }}>{e.name}</p>
              <p>${e.price} </p>
              <p style={{ textTransform: "capitalize" }}>{e.category}</p>
              <img
                src={cross_icon}
                onClick={() => {
                  removeProduct(e._id);
                }}
                alt=""
              />
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default ListProduct;
