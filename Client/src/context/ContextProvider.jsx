import React, { createContext, useState } from "react";

export const UserAuthContext = createContext();
const ContextProvider = ({ children }) => {
  const [userDetail, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = (userDetail) => {
    setUser(userDetail);
    setIsAuthenticated(true);
  };
  return (
    <>
      <UserAuthContext.Provider value={{ userDetail, login, isAuthenticated }}>
        {children}
      </UserAuthContext.Provider>
    </>
  );
};

export default ContextProvider;
