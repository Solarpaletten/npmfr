import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom'; // Правильный импорт
import Header from './components/Header/index.jsx';
import Home from './components/Home/index.jsx';
import RegisterForm from './components/RegisterForm/index.jsx';
import LoginForm from './components/LoginForm/index.jsx';
import Dashboard from './components/Dashboard/index.jsx';
import Clients from './components/Clients/index.jsx';
import Button from './components/Button/index.jsx';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleRegister = () => {
    console.log("User registered");
    navigate('/login');
  };

  const handleLogin = () => {
    console.log("User logged in");
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/dashboard');
  };

  const handleLogout = () => {
    console.log("User logged out");
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/login');
  };

  return (
    <div className="app-container">
      <Header onLogout={handleLogout} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterForm onRegister={handleRegister} />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route
            path="/clients"
            element={isLoggedIn ? <Clients /> : <Navigate to="/login" />}
          />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          /> {/* Проверка: если не залогинен, перенаправляем на логин */}
        </Routes>
      </div>
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