import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.css";

const Item = ({ item }) => {
  const [isOpen, setIsOpen] = useState(item.open || false);
  const location = useLocation();
  const isActive = location.pathname === item.path;
  console.log(location.pathname, item.path);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`${styles.menu_item} ${isActive ? styles.active : ""}`}>
        {item.subItems ? (
          <div
            className={`${styles.sub_menu_title} ${
              isOpen ? styles.active : ""
            }`}
            onClick={toggleMenu}
          >
            <div>
              <FontAwesomeIcon icon={item.icon} className={styles.menu_icon} />
              {item.label}
            </div>
            {isOpen ? (
              <FontAwesomeIcon icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} />
            )}
          </div>
        ) : (
          <Link to={item.path}>
            <FontAwesomeIcon icon={item.icon} className={styles.menu_icon} />
            {item.label}
          </Link>
        )}
      </div>

      {isOpen && item.subItems && (
        <div className={styles.sub_menu}>
          {item.subItems.map((subItem, index) => (
            <Item key={index} item={subItem} />
          ))}
        </div>
      )}
    </>
  );
};

export default Item;
