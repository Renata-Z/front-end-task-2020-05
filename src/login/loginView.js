import React from 'react';
import './loginView.css';
import Logo from '../images/logo.png';
import { login } from './loginService';

function Image(props) {
    return (
      <img className='image' src={props.src} alt={props.alt} />
    )
};
  
function UsernameInput(props) {
    return (
      <input className='input-field' type='text' placeholder='Username' required autoComplete="on" {...props} />
    );
};
  
function PasswordInput(props) {
    return (
      <input className='input-field' type='password' placeholder='Password' required autoComplete='off' {...props} />
    )
};


class LoginWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
        [e.target.name]: e.target.value,
      });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const loginData = {
      username: this.state.username,
      password: this.state.password
      };
    const tokenObject = await login(loginData);
    const token = tokenObject.token;
    this.props.onLogin(token);
  }

  loginForm() {
    return (
      <div className='login-container'>
        <Image src={Logo} alt='logo' />  
          <form onSubmit={this.handleSubmit}>
            <UsernameInput name='username' value={this.state.username} onChange={this.handleChange} />
            <PasswordInput name='password' value={this.state.password} onChange={this.handleChange} />
            <input className='button-submit' type='submit' value='Log in' />
          </form>
      </div>
    )
  } 

  render() {
    return this.loginForm();
  }
};


export { LoginWindow };