import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { backendUrl } from "../../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="login">
      <div className="login-box">
        <div className="login-form">
          <h1>Admin Login</h1>
          <form onSubmit={submitHandler}>
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            ></input>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            ></input>
            <button type="submit" className="btn login-continue">
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
