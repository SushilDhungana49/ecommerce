import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";

const Item = (props) => {
  return (
    <div className="item">
      <Link to={`/product/${props.id}`} onClick={scroll(0, 0)}>
        <img src={props.image[0]} className="item-image"></img>
      </Link>
      <p className="item-name">{props.name}</p>
      <div className="item-price">
        <div className="item-price-new">${props.price} </div>
      </div>
    </div>
  );
};

export default Item;
