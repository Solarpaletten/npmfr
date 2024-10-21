import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/">Home</Link>
      <Link to="/clients">Clients</Link>
      {/* Добавляйте другие ссылки по необходимости */}
    </div>
  );
}

export default Sidebar;
// Compare this snippet from frontend/src/Footer.js: