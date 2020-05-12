import React from 'react';
import { LoginWindow } from './login/loginView';
import Table from './list/list-view';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null
    };
    this.saveToken = this.saveToken.bind(this);
  }

  saveToken(token) {
      this.setState({ token: token });
  }

  render() {
    return (
      <div>
        {this.state.token ? (
          <Table token={this.state.token} /> 
        ) : (
          <LoginWindow onLogin={this.saveToken} />
          ) 
        }
      </div>
   );
  } 
};

export default App;