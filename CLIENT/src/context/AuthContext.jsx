import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check for existing session on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (email, password, navigate) => {
    try {
      // Your login logic...
      setUser({ email });
      if (navigate) navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const register = async (email, password, navigate) => {
    try {
      // Your registration logic...
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
