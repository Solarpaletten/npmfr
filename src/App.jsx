// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientsPage from './pages/Clients';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<ClientsPage />} /> {/* Изменили путь с /clients на / */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
