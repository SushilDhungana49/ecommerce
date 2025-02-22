import React, { useState, useContext, useEffect } from "react";
import { backendUrl } from "../../App";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDisplay.css";
import star_icon from "../../Assets/Frontend_Assets/star_icon.png";
import star_dull_icon from "../../Assets/Frontend_Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = () => {
  const { addToCart } = useContext(ShopContext);
  const [size, setSize] = useState("");
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
  }, [productId]);

  return (
    <div className="productDisplay">
      <div className="productDisplay-left">
        <div className="productDisplay-images">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productDisplay-image">
          <img
            className="productDisplay-mainImage"
            src={product.image}
            alt=""
          />
        </div>
      </div>
      <div className="productDisplay-right">
        <h1>{product.name}</h1>
        <div className="productDisplay-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p className="productDisplay-rating">(144)</p>
        </div>
        <div className="productDisplay-prices">
          <div className="productDisplay-newPrice">${product.price}</div>
        </div>
        <div className="productDisplay-description">{product.description}</div>
        <div className="productDisplay-sizes">
          <h2>Select Size</h2>

          <div className="productDisplay-sizeList">
            <div
              onClick={() => setSize(size === "S" ? "" : "S")}
              className={size === "S" ? "isActive" : ""}
            >
              S
            </div>
            <div
              onClick={() => setSize(size === "M" ? "" : "M")}
              className={size === "M" ? "isActive" : ""}
            >
              M
            </div>
            <div
              onClick={() => setSize(size === "L" ? "" : "L")}
              className={size === "L" ? "isActive" : ""}
            >
              L
            </div>
            <div
              onClick={() => setSize(size === "XL" ? "" : "XL")}
              className={size === "XL" ? "isActive" : ""}
            >
              XL
            </div>
            <div
              onClick={() => setSize(size === "XXL" ? "" : "XXL")}
              className={size === "XXL" ? "isActive" : ""}
            >
              XXL
            </div>
          </div>
        </div>

        <button onClick={() => addToCart(product._id, size)}>
          Add to Cart
        </button>
        <div
          className="productDisplay-category"
          style={{ textTransform: "capitalize" }}
        >
          {" "}
          <span>Category:</span> {product.category}, {product.subcategory}{" "}
          <br />
          <span>Tags:</span> Modern, Latest
        </div>
      </div>
    </div>
  );
};
export default ProductDisplay;
