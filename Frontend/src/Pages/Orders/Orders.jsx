import React, { useContext, useEffect, useState } from "react";
import "../CSS/Orders.css";
import { ShopContext } from "../../Context/ShopContext";
import axios from "axios";
import { backendUrl } from "../../App";
import { toast } from "react-toastify";
const Orders = () => {
  const [orderData, setOrderData] = useState([]);
  const { token } = useContext(ShopContext);
  const fetchOrder = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        console.log(response.data);
        let allItemsData = [];
        response.data.orderData.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.paymentMethod;
            item["date"] = order.date;

            allItemsData.push(item);
          });
        });
        setOrderData(allItemsData.reverse());
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, [token]);

  return (
    <div className="orders">
      <h1>My Orders</h1>
      {orderData.map((item, index) => {
        return (
          <div key={index}>
            <hr />
            <div className="orders-order">
              <img src={item.image[0]} alt="" />
              <div className="orders-info">
                <h4>{item.name}</h4>
                <p className="orders-subInfo">
                  ${item.price} Quantity: {item.quantity} Size: {item.size}
                </p>
                <p>
                  Date: <span>{new Date(item.date).toDateString()}</span> <br />
                  Payment Method: <span>{item.payment}</span>
                </p>
              </div>
              <p>
                <span className="greenCircle"></span> {item.status}
              </p>
              <button onClick={fetchOrder}>Track Order</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
