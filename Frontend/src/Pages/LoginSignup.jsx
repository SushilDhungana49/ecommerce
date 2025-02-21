import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";

import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  var [terms, setTerms] = useState(false);

  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const termsHandler = (event) => {
    setTerms(event.target.checked);
  };
  // useEffect(() => {
  //   termsHandler();
  // }, []);

  const login = async () => {
    // console.log("Login executed", formData);
    // let responseData;

    // await fetch("http://localhost:4000/login", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/form-data",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // })
    //   .then((response) => response.json())
    //   .then((data) => (responseData = data));
    // if (responseData.success) {
    //   localStorage.setItem("auth-token", responseData.token);
    //   window.location.replace("/");
    // } else {
    //   alert(responseData.errors);
    // }

    const response = await axios.post(backendUrl + "/api/user/login", {
      email: formData.email,
      password: formData.password,
    });
    try {
      if (response.data.success) {
        let token = response.data.token;
        localStorage.setItem("token", token);
        toast.success("Logged in successfully");
        window.location.replace("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const signUp = async () => {
    // console.log("Signup executed", formData);
    // let responseData;
    // await fetch("http://localhost:4000/signup", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/form-data",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // })
    //   .then((response) => response.json())
    //   .then((data) => (responseData = data));
    // if (responseData.success) {
    //   localStorage.setItem("auth-token", responseData.token);
    //   window.location.replace("/");
    // } else {
    //   alert(responseData.errors);
    // }
    const response = await axios.post(backendUrl + "/api/user/register", {
      name: formData.username,
      email: formData.email,
      password: formData.password,
    });
    try {
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        window.location.replace("/");
        toast.success("Signed up successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="loginSignup">
      <div className="login-box">
        <div className="login-form">
          <h1>{state}</h1>
          {state === "Sign Up" ? (
            <input
              type="text"
              placeholder="Your Name"
              name="username"
              onChange={changeHandler}
              value={formData.username}
            ></input>
          ) : (
            <></>
          )}
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={changeHandler}
            value={formData.email}
          ></input>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={changeHandler}
            value={formData.password}
          ></input>
          <button
            className="btn login-continue"
            onClick={() => {
              terms
                ? state === "Login"
                  ? login()
                  : signUp()
                : toast.error("You must agree to our terms & conditions!");
            }}
          >
            Continue
          </button>
        </div>
        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span onClick={() => setState("Login")}>Login</span>{" "}
          </p>
        ) : (
          <></>
        )}
        {state === "Login" ? (
          <p>
            {" "}
            Don't have an account?{" "}
            <span onClick={() => setState("Sign Up")}>Sign Up</span>
          </p>
        ) : (
          <></>
        )}
        <p className="login-checkbox">
          {" "}
          <input
            type="checkbox"
            name="terms"
            onChange={(event) => termsHandler(event)}
          />
          &nbsp; By continuing, I agree the terms of use & privacy policy.
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
