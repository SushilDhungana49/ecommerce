import React, { useEffect, useState } from "react";
import axios from "axios";
import parcel_icon from "../../assets/parcel_icon.svg";
import { toast } from "react-toastify";
import { backendUrl } from "../../App";
import "./Orders.css";
const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const changeStatus = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        {
          orderId,
          status: event.target.value,
        },
        { headers: { token } }
      );
      if (response.data.success) {
        fetchOrders();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const fetchOrders = async () => {
    const response = await axios.post(
      backendUrl + "/api/order/list",
      {},
      { headers: { token } }
    );
    console.log(response.data);
    setOrders(response.data.orders);
  };
  useEffect(() => {
    fetchOrders();
  }, [token]);
  useEffect(() => {
    console.log(orders);
  }, [orders]);
  return (
    <div className="orders">
      <h1>List of Orders</h1>
      <div className="orders-list">
        {orders.map((order, index) => (
          <div key={index} className="orders-order">
            <img src={parcel_icon} alt="" />
            <div className="orders-item">
              {order.items.map((item, index) => (
                <p key={index}>
                  {item.name} x {item.quantity} {item.size}
                </p>
              ))}{" "}
              <div className="orders-address">
                <br />
                <p className="orders-customerName">
                  {order.address.firstName} {order.address.lastName}{" "}
                </p>
                <p>Street: {order.address.street} </p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country}, {order.address.zipcode}
                </p>
                <p>{order.address.phone} </p>
              </div>
            </div>

            <div className="orders-item">
              <p>Items: {order.items.length}</p>
              <p>Payment Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Done" : "Pending"}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <div className="orders-price">
              <p> ${order.amount}</p>
            </div>
            <div className="orders-status">
              <select
                name="status"
                value={order.status}
                onChange={(event) => changeStatus(event, order._id)}
              >
                <option value="Order placed">Order placed</option>
                <option value="Packed">Packed</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
