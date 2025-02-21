import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../../Assets/Frontend_Assets/cart_cross_icon.png";
import "./CartItems.css";
import CartTotals from "../CartTotals/CartTotals";
import { toast } from "react-toastify";

const CartItems = () => {
  const {
    allProducts,
    cartItems,
    updateCart,
    getTotalAmount,
    navigate,
    onChangePromo,
    promoHandler,
  } = useContext(ShopContext);

  // const promoCodes = JSON.parse(import.meta.env.VITE_PROMO);
  // const [newTotal, setNewTotal] = useState(getTotalAmount());
  // const [promo, setPromo] = useState("");
  // const onChangePromo = (event) => {
  //   setPromo(event.target.value.toUpperCase());
  // };

  // const promoHandler = () => {
  //   if (promoCodes.includes(promo)) {
  //     if (promo === "FIRST10%") {
  //       setNewTotal(getTotalAmount() * 0.9);
  //     } else if (promo === "REGULAR50") {
  //       if (getTotalAmount() > 50) {
  //         setNewTotal(getTotalAmount() - 50);
  //       } else {
  //         setNewTotal(0);
  //       }
  //     }
  //   } else {
  //     toast.error("Invalid promo code");
  //   }
  //   console.log(newTotal);
  // };

  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  // useEffect(() => {
  //   const cart = getCart();
  //   console.log(cart);
  // }, []);

  return (
    <div className="cartItems">
      <div className="cartItems-main">
        <p>Products</p>
        <p>Size</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {cartData.map((item, index) => {
        const productData = allProducts.find(
          (product) => product._id === item._id
        );
        return (
          <div key={index}>
            <div className="cartItems-main cartItems-product">
              <img src={productData.image} className="cartItems-product-icon" />
              <button>{item.size}</button>
              <p>{productData.name}</p>
              <p>${productData.price} </p>
              <input
                type="number"
                className="cartItems-quantity"
                defaultValue={item.quantity}
                min={1}
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateCart(item._id, item.size, Number(e.target.value))
                }
              ></input>
              <p>${item.quantity * productData.price}</p>
              <img
                src={remove_icon}
                onClick={() => {
                  updateCart(item._id, item.size, 0);
                }}
                alt=""
              />
            </div>
          </div>
        );
      })}
      <div className="cartItems-totals-promo">
        <div>
          <CartTotals />
          <button
            className="btn cartItems-payment-btn"
            onClick={() =>
              getTotalAmount() === 0
                ? toast.error("Cart is empty!")
                : navigate("/place-order")
            }
          >
            Proceed to Payment
          </button>
        </div>
        <div className="cartItems-promo">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartItems-promo-input">
            <input
              type="text"
              placeholder="Promo Code"
              onChange={(event) => onChangePromo(event)}
            />
            <button className="cartItems-promo-btn" onClick={promoHandler}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
