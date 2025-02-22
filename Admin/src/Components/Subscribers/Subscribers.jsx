import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Subscribers.css";
import { backendUrl } from "../../App";

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const fetchSubscribers = async () => {
    const response = await axios.get(backendUrl + "/api/subscribers/list");
    setSubscribers(response.data.subscribers);
  };
  useEffect(() => {
    fetchSubscribers();
  }, []);

  return (
    <div className="subscribers">
      <h1>List of Subscribers</h1>
      <div className="subscribers-subscribers">
        {subscribers.map((item, index) => {
          return (
            <div key={index} className="subscribers-subscriber">
              <p className="subscribers-email">{item.email}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Subscribers;
