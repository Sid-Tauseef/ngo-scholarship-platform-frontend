// ngo-scholarship-platform-frontend\src\contexts\AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token); // Get token from Redux
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (err) {
      console.error("Error loading user from localStorage", err);
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (!token) {
      setUser(null); // Clear user if token is invalid or missing
      localStorage.removeItem("user");
    }
  }, [token]);

  const logoutHandler = () => {
    setUser(null);
    dispatch(logout()); // This will clear token and user in Redux
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, logout: logoutHandler }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);