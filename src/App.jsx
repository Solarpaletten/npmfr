import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom'; // Правильный импорт
import Header from './Header';
import Home from './Home';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import Clients from './Clients';
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
          <Route path="/clients" element={<Clients />} />
          <Route 
            path="/dashboard" 
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} 
          /> {/* Проверка: если не залогинен, перенаправляем на логин */}
        </Routes>
      </div>
    </div>
  );
}

// Оборачиваем App в <Router> в корневом файле
export default function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}