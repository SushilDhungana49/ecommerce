import React, { useContext, useState } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Item/Item";

const ShopCategory = (props) => {
  const { allProducts } = useContext(ShopContext);
  const categoryProduct = allProducts.filter(
    (e) => e.category === props.category
  );
  const [explore, setExplore] = useState(false);
  const handleMore = () => {
    setExplore(!explore);
  };
  return (
    <div className="shopCategory">
      <img src={props.banner} alt="banner" className="banner" />
      <div className="shopCategory-indexCategory">
        {!explore ? (
          <p>
            <span>
              Showing 1-
              {allProducts.filter((item) => item.category === props.category)
                .length > 8
                ? 8
                : allProducts.filter((item) => item.category === props.category)
                    .length}{" "}
              products{" "}
            </span>{" "}
            out of{" "}
            {
              allProducts.filter((item) => item.category === props.category)
                .length
            }{" "}
            products
          </p>
        ) : (
          <p>
            <span>
              Showing 1-
              {
                allProducts.filter((item) => item.category === props.category)
                  .length
              }{" "}
              products{" "}
            </span>{" "}
            out of{" "}
            {
              allProducts.filter((item) => item.category === props.category)
                .length
            }{" "}
            products
          </p>
        )}
      </div>
      <div className="shopCategory-products">
        {!explore
          ? categoryProduct.slice(0, 8).map((item, i) => {
              return (
                <Item
                  key={i}
                  id={item._id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                />
              );
            })
          : categoryProduct.slice(0, -1).map((item, i) => {
              return (
                <Item
                  key={i}
                  id={item._id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                />
              );
            })}
      </div>
      <div className="shopCategory-loadmore" onClick={handleMore}>
        {!explore ? "Explore More" : "Show Less"}
      </div>
    </div>
  );
};

export default ShopCategory;
