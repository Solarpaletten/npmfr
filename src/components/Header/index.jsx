import React from 'react';
import Logo from './solar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import styles from './index.module.css';

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.header_left}>
        <img src={Logo} alt="Solar Logo" className={styles.logo} />
      </div>
      <div className={styles.header_center}>
        <span>Invite users</span>
        <span>Minimal</span>
        <span>Balance 0,00 €</span>
        <span>Partnership points 0,00 €</span>
      </div>
      <div className={styles.header_right}>
        <span>Leanid</span>
        <span>UG SWAPOIL</span>
        <FontAwesomeIcon icon={faUser} style={{ color: '#B43F3F', margin: '0 5px 0 10px' }} />
        <div className={styles.user_avatar}></div>
      </div>
    </div>
  );
}

export default Header;