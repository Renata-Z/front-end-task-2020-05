import React from "react";
import "./LoginView.css";
import logo from "../images/logo.png";
import { login } from "./tesonetAPI";

export class LoginWindow extends React.Component {
  state = {
    username: "",
    password: "",
    errMessage: null,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      username: this.state.username,
      password: this.state.password,
    };
    try {
      const tokenObject = await login(loginData);
      const token = tokenObject.token;
      this.props.onLogin(token);
    } catch (error) {
      this.setState({
        errMessage: error.message,
      });
    }
  };

  loginForm() {
    return (
      <div className="login-container">
        <img className="image" src={logo} alt="logo" />
        <p className="error-message">
          {this.state.errMessage && this.state.errMessage}
        </p>
        <form onSubmit={this.handleSubmit}>
          <input
            className="input-field"
            type="text"
            placeholder="Username"
            required
            autoFocus
            autoComplete="on"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            required
            autoComplete="off"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <input className="button-submit" type="submit" value="Log in" />
        </form>
      </div>
    );
  }

  render() {
    return this.loginForm();
  }
};
