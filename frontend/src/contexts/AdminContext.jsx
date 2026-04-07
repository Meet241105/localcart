import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("adminToken") || null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  // Set axios defaults
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${API_URL}/admin/login`, {
        email,
        password,
      });
      setAdmin(data);
      setToken(data.token);
      localStorage.setItem("adminToken", data.token);
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem("adminToken");
    delete axios.defaults.headers.common["Authorization"];
  };

  const getProfile = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/admin/profile`);
      setAdmin(data);
      return data;
    } catch (error) {
      logout();
      throw error;
    }
  };

  // Auto-load profile on mount if token exists
  useEffect(() => {
    if (token && !admin) {
      getProfile().catch(() => logout());
    }
  }, []);

  return (
    <AdminContext.Provider
      value={{
        admin,
        token,
        login,
        logout,
        getProfile,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
