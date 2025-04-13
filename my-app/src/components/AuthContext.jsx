// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

// Create a context with a default value
const AuthContext = createContext();

// Create a custom hook to use the context easily
export const useAuth = () => useContext(AuthContext);

// Provider component to wrap your app
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const do_login = () => setIsLoggedIn(true);
  const do_logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, do_login, do_logout }}>
      {children}
    </AuthContext.Provider>
  );
};