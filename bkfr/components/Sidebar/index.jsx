import {
    faAngleDown,
    faAngleUp,
    faArrowRightFromBracket,
    faGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../../frontend/src/components/Button/index.jsx";
import { useUser } from "../../contexts/UserContext.jsx";
import menuData from "./menuData.js";
import Logo from "./Solar_3.svg";

import styles from "./index.module.css";

const Sidebar = () => {
  const { user, logoutUser } = useUser();
  const navigate = useNavigate();

  const onLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo_container}>
        <img src={Logo} alt="Solar Logo" className={styles.logo} />
      </div>
      <div className={styles.items}>
        {menuData.map((item, index) => {
          if (item.path === "/dashboard" && user?.role !== "admin") {
            return null;
          }
          return <Item key={index} item={item} />;
        })}
      </div>
      <div className={styles.bottom}>
        <div className={styles.item}>
          <FontAwesomeIcon icon={faGear} />
          <Link to="/settings">Settings</Link>
        </div>
        <Button
          className={styles.button}
          icon={faArrowRightFromBracket}
          onClick={onLogout}
        >
          Log Out
        </Button>
      </div>
    </aside>
  );
};

const Item = ({ item }) => {
  const location = useLocation();
  const isActive =
    location.pathname === item.path ||
    (item.subItems &&
      item.subItems.some((sub) => location.pathname.startsWith(sub.path)));
  const [isOpen, setIsOpen] = useState(isActive);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const itemClasses = `${styles.item} ${isActive ? styles.active : ""}`;
  const subItemClasses = `${styles.sub_title} ${isOpen ? styles.active : ""}`;

  return (
    <>
      <div className={itemClasses}>
        {item.subItems ? (
          <div className={subItemClasses} onClick={toggleMenu}>
            <div>
              <FontAwesomeIcon icon={item.icon} />
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
            <FontAwesomeIcon icon={item.icon} />
            {item.label}
          </Link>
        )}
      </div>

      {isOpen && item.subItems && (
        <div className={styles.sub}>
          {item.subItems.map((subItem, index) => (
            <Item key={index} item={subItem} />
          ))}
        </div>
      )}
    </>
  );
};

export default Sidebar;
