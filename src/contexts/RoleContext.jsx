// front/ngo-scholarship-platform-frontend/src/contexts/RoleContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { useSelector } from "react-redux";

const RoleContext = createContext({
  role: null,
  setRole: () => {},
});

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const user = useSelector((state) => state.auth.user);

  // Sync RoleContext with Redux user.role
  useEffect(() => {
    if (user?.role) {
      setRole(user.role);
    } else {
      setRole(null); // Reset role when user logs out
    }
  }, [user]);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);