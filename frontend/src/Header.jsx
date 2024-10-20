import React from 'react';
import './Header.css';  // Import styles for the top bar
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <div className="header">
      <div className="header-left">
        <img src="solar.png" alt="Solar.de logo" className="logo" />
      </div>
      <div className="header-center">
        <span>Invite users</span>
        <span>Minimal</span>
        <span>Balance 0,00 €</span>
        <span>Partnership points 0,00 €</span>
      </div>
      <div className="header-right">
        <span>Leanid</span>
        <span>UG SWAPOIL</span>
        <FontAwesomeIcon icon={faSmile} style={{ color: 'orange', marginLeft: '10px' }} />
        <div className="user-avatar"></div> {/* Placeholder for the user avatar */}
      </div>
    </div>
  );
}

export default Header;


