import React, { useState } from "react";
import "./LoginView.css";
import logo from "../images/logo.png";
import { login } from "./tesonetAPI";

export const LoginWindow = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      username: username,
      password: password,
    };
    try {
      const tokenObject = await login(loginData);
      const token = tokenObject.token;
      onLogin(token);
    } catch (error) {
      setErrMessage(() => error.message);
    }
  };

  return (
    <div className="login-container">
      <img className="image" src={logo} alt="logo" />
      <p className="error-message">{errMessage && errMessage}</p>
      <form onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="text"
          placeholder="Username"
          required
          autoFocus
          autoComplete="on"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="input-field"
          type="password"
          placeholder="Password"
          required
          autoComplete="off"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input className="button-submit" type="submit" value="Log in" />
      </form>
    </div>
  );
};
