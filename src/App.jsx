import React, { useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import RegisterForm from "./pages/RegisterForm";
import LoginForm from "./pages/LoginForm";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Warehouse from "./pages/Warehouse";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = useCallback(
    (path) => {
      console.log("User logged in");
      setIsLoggedIn(true);
      navigate(path);
    },
    [navigate]
  );

  const handleLogout = useCallback(() => {
    console.log("Invalid token");
    console.log("User logged out");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    setIsLoggedIn(false);
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          handleLogout();
        } else {
          handleLogin(location.pathname);
        }
      } catch (error) {
        handleLogout();
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn, location.pathname, handleLogin, handleLogout]);

  const handleRegister = () => {
    console.log("User registered");
    navigate("/login");
  };

  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={<RegisterForm onRegister={handleRegister} />}
        />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route
          path="/clients"
          element={
            <ProtectedRoute>
              <Clients onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/warehouse"
          element={
            <ProtectedRoute>
              <Warehouse onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
