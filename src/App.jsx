import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home/index.jsx";
import RegisterForm from "./pages/RegisterForm/index.jsx";
import LoginForm from "./pages/LoginForm/index.jsx";
import Dashboard from "./pages/Dashboard/index.jsx";
import Clients from "./pages/Clients/index.jsx";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (path) => {
    console.log("User logged in");
    setIsLoggedIn(true);
    navigate(path)
  };

  const handleLogout = () => {
    console.log("Invalid token");
    console.log("User logged out");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

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
  }, [isLoggedIn]);

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
