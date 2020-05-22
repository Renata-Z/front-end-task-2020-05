import React from "react";
import { LoginWindow } from "./login/LoginView";
import { Table } from "./list/ListView";
import "./App.css";
import { TokenProvider, TokenContext } from "./context/TokenContext";

class App extends React.Component {
  render() {
    return (
      <TokenProvider>
        <TokenContext.Consumer>
          {({ token, saveToken }) =>
            token ? <Table /> : <LoginWindow onLogin={saveToken} />
          }
        </TokenContext.Consumer>
      </TokenProvider>
    );
  }
};

export default App;
