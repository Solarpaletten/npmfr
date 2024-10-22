import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faAngleDown,
  faAngleUp,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/index.jsx";
import menuData from "./menuData.js";
import Logo from "./Solar_3.svg";

import styles from "./index.module.css";

const Sidebar = ({ onLogout }) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo_container}>
        <img src={Logo} alt="Solar Logo" className={styles.logo} />
      </div>
      <div className={styles.menu}>
        {menuData.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </div>
      <div className={styles.bottom}>
        <div className={styles.menu_item}>
          <FontAwesomeIcon icon={faGear} />
          <Link to="#">Settings</Link>
        </div>
        <Button icon={faArrowRightFromBracket} onClick={onLogout}>
          Log Out
        </Button>
      </div>
    </aside>
  );
};

const MenuItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(item.open || false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={styles.menu_item}>
        {item.subItems ? (
          <div
            className={`${styles.sub_menu_title} ${
              isOpen ? styles.active : ""
            }`}
            onClick={toggleMenu}
          >
            {item.label}
            {isOpen ? (
              <>
                <FontAwesomeIcon
                  icon={faAngleUp}
                  style={{ fontSize: "14px", margin: "0 5px" }}
                />
              </>
            ) : (
              <FontAwesomeIcon
                icon={faAngleDown}
                style={{ fontSize: "14px", margin: "0 5px" }}
              />
            )}
          </div>
        ) : (
          <Link to={item.path}>{item.label}</Link>
        )}
      </div>

      {isOpen && item.subItems && (
        <div className={styles.sub_menu}>
          {item.subItems.map((subItem, index) => (
            <MenuItem key={index} item={subItem} />
          ))}
        </div>
      )}
    </>
  );
};

export default Sidebar;
