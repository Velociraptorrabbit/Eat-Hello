import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";

const regeneratorRuntime = require("regenerator-runtime");

const LoginPopup = ({ loggedIn, setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // may need a few more for page behavior
  useEffect(() => {
    console.log(username, password);
    console.log("isLoggedIn state: ", loggedIn);
  });

  useEffect(async () => {
    await axios
      .get("/login/checkCookie", { withCredentials: true })
      .then((res) => {
        if (res.data === "success") {
          setLoggedIn(true);
        }
      });
  }, []);

  async function onLoginClick() {
    await axios
      .post(
        "/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        if (res.data === "success") {
          setLoggedIn(true); //redirect us
        } else {
          // throw component error
          setLoggedIn(false);
        }
      });
  }

  async function onRegisterClick() {
    // check agains the data base if this is a valid username / password pair
    await axios
      .post("/login/signup", {
        username,
        password,
      })
      .then((res) => {
        console.log(res);
        if (res) {
          console.log("Registration successful");
        } else {
          console.log("Registration failed");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="loginForm">
      <Fragment>
        <div className="credContainer">
          <h2>Account Info</h2>
          <input
            type="text"
            id="username"
            placeholder={"username"}
            onChange={(e) => setUsername(e.target.value)}
            className="textbox"
          ></input>
          <div></div>
          <input
            type="text"
            id="password"
            placeholder={"password"}
            onChange={(e) => setPassword(e.target.value)}
            className="textbox"
          ></input>
          <div className="button-login">
            <button type="reset" className="submit" onClick={onLoginClick}>
              Login
            </button>
            <button type="reset" className="submit" onClick={onRegisterClick}>
              Signup
            </button>
          </div>
        </div>
      </Fragment>
    </div>
  );
};

export default LoginPopup;
