import React, { useContext, useEffect, useState } from "react";
import "./Breadcrumb.css";
import arrow from "../../Assets/Frontend_Assets/breadcrum_arrow.png";
import { ShopContext } from "../../Context/ShopContext";

const Breadcrumb = ({ productId }) => {
  const [product, setProduct] = useState({});
  const { allProducts, navigate } = useContext(ShopContext);
  useEffect(() => {
    let prod = allProducts.find((item) => item._id === productId);
    setProduct(prod);
  }, [productId, allProducts]);

  return product ? (
    <div className="breadcrumb">
      {" "}
      <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        Shop{" "}
      </span>
      <img src={arrow}></img>{" "}
      <span
        style={{ cursor: "pointer" }}
        onClick={() =>
          product.category === "kid"
            ? navigate("/kids")
            : navigate(`/${product.category}`)
        }
      >
        {product.category}{" "}
      </span>
      <img src={arrow}></img> {product.name}
    </div>
  ) : (
    <div></div>
  );
};

export default Breadcrumb;
