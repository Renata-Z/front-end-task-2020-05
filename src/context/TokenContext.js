import React from "react";

export const TokenContext = React.createContext({});

export class TokenProvider extends React.Component {
  state = {
    token: null,
  };

  saveToken = (token) => {
    this.setState({
      token: token,
    });
  }

  render() {
    return (
      <TokenContext.Provider
        value={{
          token: this.state.token,
          saveToken: this.saveToken,
        }}
      >
        {this.props.children}
      </TokenContext.Provider>
    );
  }
};