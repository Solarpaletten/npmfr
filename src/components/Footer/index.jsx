
import React from 'react';

import styles from './index.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_container}>
        <span>Invite Users</span>
        <span>Minimal</span>
        <span>Balance 0,00 €</span>
        <span>Partnership Points 0,00 €</span>
      </div>
    </footer>
  );
}

export default Footer;
