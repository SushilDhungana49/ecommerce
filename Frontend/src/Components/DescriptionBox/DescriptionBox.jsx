import React, { useState, useContext, useEffect } from "react";
import { backendUrl } from "../../App";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  const [product, setProduct] = useState({});
  const { productId } = useParams();
  const fetchProduct = async () => {
    const response = await axios.post(backendUrl + "/api/product/single", {
      id: productId,
    });
    setProduct(response.data.product);
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="descriptionBox">
      <div className="descriptionBox-nav">
        <div className="descriptionBox-navBox">Description</div>
        <div className="descriptionBox-navBox fade">Reviews (122)</div>
      </div>
      <div className="descriptionBox-description">
        <p>
          An e-commerce website is an online platform that facilitates the
          buying and selling of products or services over the internet. It
          serves as a virtual marketplace where businesses and individuals can
          showcase their products, interact with customers, and conduct
          transactions without the need for a physical presence. E-commerce
          websites have gained immense popularity due to their convenience,
          accessibility, and the global reach they offer. <br />
          <br />
          E-commerce websites typically display products or services along with
          detailed descriptions, images, prices, and any available variations
          (e.g., sizes, colors). Each product usually has its own dedicated page
          with relevant information.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
