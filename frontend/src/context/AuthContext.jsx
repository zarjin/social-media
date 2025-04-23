import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const AUTH_API = import.meta.env.VITE_AUTH_API;

  const register = async (registerData) => {
    try {
      const { data } = await axios.post(`${AUTH_API}/register`, registerData, {
        withCredentials: true,
      });
      toast.success(data.message);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const login = async (loginData) => {
    try {
      const { data } = await axios.post(`${AUTH_API}/login`, loginData, {
        withCredentials: true,
      });
      toast.success(data.message);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.get(`${AUTH_API}/logout`, {
        withCredentials: true,
      });
      checkAuth();
      toast.success(data.message);
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const checkAuth = async () => {
    try {
      const { data } = await axios.get(`${AUTH_API}/check-auth`, {
        withCredentials: true,
      });

      setIsAuthenticated(data.authentication);
    } catch (error) {
      console.log("Auth check error:", error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ register, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
