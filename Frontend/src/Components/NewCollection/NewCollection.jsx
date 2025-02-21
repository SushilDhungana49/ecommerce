import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import "./NewCollection.css";
import axios from "axios";
import Item from "../Item/Item";
import { backendUrl } from "../../App";
import LoginSignup from "../../Pages/LoginSignup";
import { Element } from "react-scroll";

const NewCollection = () => {
  const { allProducts } = useContext(ShopContext);
  const [collection, setCollection] = useState([]);
  useEffect(() => {
    setCollection(allProducts.slice(-4));
  }, [allProducts]);

  return (
    <Element name="latestCollection">
      <div className="new-collection">
        <div className="h1-hr">
          <h1 className="h1">NEW COLLECTIONS</h1> <hr className="hr" />
        </div>
        <div className="item-container">
          {collection.map((item, i) => {
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
    </Element>
  );
};

export default NewCollection;
