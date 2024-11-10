// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ClientsPage from './pages/Clients';
import LoginForm from './pages/LoginForm';

// Компонент для защищенных маршрутов
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  // Функция для обработки успешного логина
  const handleLogin = () => {
    // После успешного логина перенаправляем на страницу клиентов
    return <Navigate to="/" />;
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          {/* Маршрут для логина */}
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />

          {/* Защищенный маршрут для клиентов */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <ClientsPage />
              </PrivateRoute>
            }
          />

          {/* Редирект с других путей на главную */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
