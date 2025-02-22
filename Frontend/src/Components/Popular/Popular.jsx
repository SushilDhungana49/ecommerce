import React, { useState, useEffect, useContext } from "react";
import "./Popular.css";
import { ShopContext } from "../../Context/ShopContext";
import axios from "axios";
import Item from "../../Components/Item/Item";
import { Element } from "react-scroll";
import { backendUrl } from "../../App";

const Popular = () => {
  const { allProducts } = useContext(ShopContext);
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    setPopular(allProducts.filter((item) => item.bestseller));
  }, []);
  return (
    <Element name="bestsellingProduct">
      {" "}
      <div className="popular">
        <div className="h1-hr">
          <h1 className="h1">Bestselling Products</h1> <hr className="hr" />
        </div>
        <div className="popular-female">
          {allProducts.map((item, i) => {
            if (item.bestseller) {
              return (
                <Item
                  key={i}
                  id={item._id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </Element>
  );
};

export default Popular;
