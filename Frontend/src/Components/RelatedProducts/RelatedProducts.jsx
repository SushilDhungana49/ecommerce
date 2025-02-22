import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../Context/ShopContext";
import "./RelatedProducts.css";
import Item from "../Item/Item";
import { backendUrl } from "../../App";
import { useParams } from "react-router-dom";
import axios from "axios";

const RelatedProducts = () => {
  const { allProducts } = useContext(ShopContext);
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

  const relatedProducts = allProducts.filter(
    (item) =>
      item.category === product.category &&
      item.subcategory === product.subcategory &&
      item._id !== product._id
  );
  return (
    <div className="relatedProducts">
      <div className="h1-hr">
        <h1 className="h1">Related Products</h1>
        <hr className="hr" />
      </div>
      <div className="item-container">
        {relatedProducts.slice(0, 4).map((item, i) => {
          return (
            <Item
              key={i}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
