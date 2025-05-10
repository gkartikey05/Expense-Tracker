import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { TransactionProvider } from "./context/TransactionContext";
import { useContext } from "react";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Layout/Navbar";

function App() {
  return (
      <AuthProvider>
        <TransactionProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </TransactionProvider>
      </AuthProvider>
  );
}

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

export default App;
