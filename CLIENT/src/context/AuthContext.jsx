import axios from "axios";
import { createContext, useContext, useState } from "react";

const BASE_API =
  import.meta.env.VITE_BACKEND_API_PROD || import.meta.env.VITE_BACKEND_API_DEV;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check for existing session on initial load
  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     try {
  //       setUser(JSON.parse(storedUser));
  //     } catch {
  //       localStorage.removeItem("user");
  //     }
  //   }
  // }, []);

  const login = async (email, password) => {
    try {
      axios
        .post(`${BASE_API}/user/login`, {
          email,
          password,
        })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => console.log(err.message));
      setUser({ email });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const register = async (fullName, email, password, navigate) => {
    try {
      axios
        .post(`${BASE_API}/user/register`, {
          fullName,
          email,
          password,
        })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => console.log(err.message));
      setUser({ email });
      if (navigate) navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const logout = (navigate) => {
    setUser(null);
    if (navigate) navigate("/login");
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
