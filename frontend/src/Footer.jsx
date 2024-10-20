import React from 'react';
import './Footer.css';  // Используем стили из Header, чтобы футер был аналогичным
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  return (
    <footer className="header">
      <div className="header-left">
        <img src="logo.png" alt="Logo" className="logo" />
      </div>
      <div className="header-center">
        <span>Invite Users</span>
        <span>Minimal</span>
        <span>Balance 0,00 €</span>
        <span>Partnership Points 0,00 €</span>
      </div>
      <div className="header-right">
        <span>Leanid Kanoplich</span>
        <span>UG SWAPOIL</span>
        <FontAwesomeIcon icon={faSmile} style={{ color: 'orange', marginLeft: '10px' }} />
      </div>
    </footer>
  );
}

export default Footer;
