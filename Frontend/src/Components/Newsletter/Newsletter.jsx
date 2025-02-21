import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../../App";
import { toast } from "react-toastify";
import "./Newsletter.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const subscribe = async () => {
    try {
      const response = await axios.post(backendUrl + "/api/user/subscription", {
        email,
      });
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="newsletter">
      <h1>Get Exclusive Offers In Your Email</h1>
      <p>Subscribe to our mailing list to stay updated</p>
      <div className="subscribe">
        <input
          name="newsletter"
          type="email"
          placeholder="Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <button className="btn btn-dark" onClick={() => subscribe()}>
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Newsletter;
