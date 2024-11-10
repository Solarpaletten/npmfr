import React, { useState } from "react";
import { Link } from "react-router-dom";
import User from "./user.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";

import styles from "./index.module.css";

function Header({ onLogout }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={styles.header}>
      <div className={styles.header_center}>
        <span>Invite users</span>
        <span>Minimal</span>
        <span>Balance 0,00 €</span>
        <span>Partnership points 0,00 €</span>
      </div>
      <div
        className={styles.header_right}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span>Leanid Kanoplich</span>
        <div className={styles.user_avatar}>
          <img src={User} alt="user" />
        </div>
        {isHovered && (
          <div className={styles.dropdown}>
            <div className={styles.dropdown_content}>
              <div className={styles.dropdown_item}>
                <FontAwesomeIcon icon={faGear} />
                <Link to="/settings">Settings</Link>
              </div>
              <div className={styles.dropdown_item}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                <Button variant="link" onClick={onLogout}>Log Out</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
