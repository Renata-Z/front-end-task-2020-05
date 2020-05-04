import React from 'react';
import { Image, UsernameInput, PasswordInput } from './Login/LoginView';
import Table from './List/ListView';
import Logo from './Images/Tesonet-logo.png';
import './App.css';
import './List/ListView.css';
import './Login/LoginView.css';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      token: null,
      loggedIn: false,
      servers: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setSortedByName = this.setSortedByName.bind(this);
    this.setSortedByDistance = this.setSortedByDistance.bind(this);
  }

  handleChange(e) {
    this.setState({
        [e.target.name]: e.target.value,
      });    
  }

  getData() {
    let url = 'https://playground.tesonet.lt/v1/servers';
    let description = `Bearer ${this.state.token}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': description
      },
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } 
      throw new Error('Request failed!');
    }, networkError => {
      alert('Error: ', networkError.message);
    }).then(data => {
      this.setState({
        servers: data, 
        loggedIn: true
      });
    })
    .catch(error => {
      alert('Error! ', error);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let url = 'https://playground.tesonet.lt/v1/tokens';
    let loginData = {
      username: this.state.username,
      password: this.state.password
    };
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } 
      throw new Error('Request failed!');
    }, networkError => {
      alert('Error: ', networkError.message);
    }).then(data => {
      this.setState(
        {token: data.token}
      );
      this.getData();
    })
    .catch(error => {
      alert('Error! ', error)
    }); 
  }

  loginWindow() {
    return (
      <div className='login-container'>
        <Image src={Logo} alt='tesonet-logo' />  
          <form onSubmit={this.handleSubmit} >
            <UsernameInput name='username' value={this.state.username} onChange={this.handleChange} />
            <PasswordInput name='password' value={this.state.password} onChange={this.handleChange} />
            <input className='button-submit' type='submit' value='Log in' />
          </form>
      </div>
    )
  }

  setSortedByName() {
    const dataCopy = [...this.state.servers];
    dataCopy.sort(function(a, b) {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0; // names must be equal
    });
    this.setState(
      {servers: dataCopy}
    );
  }

  setSortedByDistance() {
    const dataCopy = [...this.state.servers];
    dataCopy.sort(function (a, b) {
      return a.distance - b.distance;
    });
    this.setState(
      {servers: dataCopy}
      );
  }

  render() {
    return (
      <div>
        {this.state.loggedIn ? (
          <Table servers={this.state.servers} setSortedByName={this.setSortedByName} setSortedByDistance={this.setSortedByDistance} />
        ) :
          this.loginWindow()
          
        }
      </div>
    )
  } 
};

export default App;