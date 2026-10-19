import React, { createContext, useContext, useState, useEffect } from "react";

const ADMIN_PASSWORD = "booknest2024";
const AUTH_KEY = "booknest_admin_auth";

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem(AUTH_KEY) === "true"
  );

  useEffect(() => {
    localStorage.setItem(AUTH_KEY, isAuthenticated ? "true" : "false");
  }, [isAuthenticated]);

  const login = (password) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, error: "Galat password. Dobara try karein." };
  };

  const logout = () => setIsAuthenticated(false);

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};
