import React, { useState } from "react";

export const TokenContext = React.createContext({});

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  return (
    <TokenContext.Provider
      value={{
        token: token,
        saveToken: setToken,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};
