import React, { useContext } from "react";
import "./CartTotals.css";
import { ShopContext } from "../../Context/ShopContext";

const CartTotals = () => {
  const { getTotalAmount, shippingFee, tempTotal } = useContext(ShopContext);
  let cartTotal = 0;
  {
    tempTotal > 0 ? (cartTotal = tempTotal) : (cartTotal = getTotalAmount());
  }
  return (
    <div className="cartItems-totals">
      <h1>Cart Totals</h1>
      <div className="cartItems-subtotal">
        <p>Subtotal</p>
        <p>${cartTotal}</p>
      </div>
      <hr />

      <div className="cartItems-subtotal cartItems-shippingFee">
        <p>Shipping Fee</p>
        <p>{cartTotal > 0 ? `$${shippingFee} ` : "$0"} </p>
      </div>
      <hr />

      <div className="cartItems-subtotal cartItems-total">
        <p>Total</p>
        <p>${cartTotal + (cartTotal > 0 ? shippingFee : 0)}</p>
      </div>
    </div>
  );
};

export default CartTotals;
