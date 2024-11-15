import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";
import Item from "./Item";
import menuData from "./menuData.js";
import Logo from "./Solar_3.svg";
import { useUser } from "../../contexts/UserContext";

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
      <div>
        <img src={Logo} alt="Solar Logo" className={styles.logo} />
      </div>
      <div className={styles.menu}>
        {menuData.map((item, index) => {
          if (item.path === "/dashboard" && user?.role !== "admin") {
            return null;
          }
          return <Item key={index} item={item} />;
        })}
      </div>
      <div className={styles.bottom}>
        <div className={styles.menu_item}>
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

export default Sidebar;
