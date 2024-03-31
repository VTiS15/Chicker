import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogStatus = () => {
    setIsLoggedIn((prevLoggedIn) => !prevLoggedIn);
  };

  const authContextValue = {
    isLoggedIn,
    handleLogStatus,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};