import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_API = [
  import.meta.env.VITE_BACKEND_API_PROD || import.meta.env.VITE_BACKEND_API_DEV,
];

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      axios
        .post(`${BASE_API}/user/login`, {
          email,
          password,
        })
        .then((result) => {
          console.log(result);
          setUser({ email });
          navigate("/dashboard");
        })
        .catch((err) => console.log(err.message));
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const register = async (fullName, email, password) => {
    try {
      axios
        .post(`${BASE_API}/user/register`, {
          fullName,
          email,
          password,
        })
        .then((result) => {
          console.log(result);
          setUser({ email });
          navigate("/dashboard");
        })
        .catch((err) => console.log(err.message));
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const logout = (navigate) => {
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
