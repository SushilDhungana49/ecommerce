import React, { useContext, useState } from "react";
import "./CSS/PlaceOrder.css";
import CartTotals from "../Components/CartTotals/CartTotals";
import stripe from "../Assets/Frontend_Assets/stripe_logo.png";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getTotalAmount,
    shippingFee,
    updatePromo,
    promo,
    promoIncludes,
    allProducts,
  } = useContext(ShopContext);
  const [method, setMethod] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    phone: "",
  });

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (getTotalAmount() === 0) {
      toast.error("Cart is empty!");
      navigate("/cart");
      exit;
    }
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              allProducts.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      const orderData = {
        address: formData,
        items: orderItems,
        amount: getTotalAmount() + shippingFee,
      };

      switch (method) {
        case "cod": {
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            promoIncludes && updatePromo(promo);
            navigate("/orders");
            toast.success("Order placed successfully!");
          } else {
            toast.error(response.data.message);
          }
          break;
        }
        case "stripe": {
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            promoIncludes && updatePromo(promo);

            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(response.data.message);
          }
          break;
        }
        default: {
          break;
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const methodHandler = (e) => {
    setMethod(e.target.name);
  };
  return (
    <div className="placeOrder">
      <form action="" onSubmit={submitHandler}>
        <div className="placeOrder-form">
          <h1>Delivery Information</h1>
          <div className="placeOrder-name">
            <input
              type="text"
              required
              name="firstName"
              onChange={changeHandler}
              value={formData.firstName}
              placeholder="First name"
            />
            <input
              type="text"
              required
              name="lastName"
              onChange={changeHandler}
              value={formData.lastName}
              placeholder="Last name"
            />
          </div>
          <input
            type="email"
            required
            name="email"
            onChange={changeHandler}
            value={formData.email}
            placeholder="Email address"
          />
          <input
            type="text"
            required
            placeholder="Street"
            name="street"
            onChange={changeHandler}
            value={formData.street}
          />
          <div>
            <input
              type="text"
              required
              placeholder="City"
              name="city"
              onChange={changeHandler}
              value={formData.city}
            />
            <input
              type="text"
              required
              placeholder="State"
              name="state"
              onChange={changeHandler}
              value={formData.state}
            />
          </div>
          <div>
            <input
              type="number"
              required
              placeholder="Zipcode"
              name="zipcode"
              onChange={changeHandler}
              value={formData.zipcode}
            />
            <input
              type="text"
              required
              placeholder="Country"
              name="country"
              onChange={changeHandler}
              value={formData.country}
            />
          </div>

          <input
            type="tel"
            required
            placeholder="Phone"
            name="phone"
            onChange={changeHandler}
            value={formData.phone}
          />
        </div>
        <div className="placeOrder-right">
          <div className="placeOrder-totals">
            <CartTotals />
          </div>
          <div className="placeOrder-paymentMethod">
            <h2>Payment Method</h2>
            <div className="placeOrder-methods">
              <button
                name="stripe"
                type="button"
                onClick={() => setMethod("stripe")}
                style={
                  method === "stripe" ? { backgroundColor: "lightGreen" } : null
                }
              >
                <img src={stripe} alt="" />
              </button>

              <button
                name="cod"
                type="button"
                onClick={() => setMethod("cod")}
                style={
                  method === "cod" ? { backgroundColor: "lightGreen" } : null
                }
              >
                Cash On Delivery
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-dark">
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
