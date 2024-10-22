import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Navigate,
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

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleRegister = () => {
    console.log("User registered");
    navigate("/login");
  };

  const handleLogin = () => {
    console.log("User logged in");
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    navigate("/dashboard");
  };

  const handleLogout = () => {
    console.log("User logged out");
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
    navigate("/login");
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
            isLoggedIn ? (
              <Clients onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
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
