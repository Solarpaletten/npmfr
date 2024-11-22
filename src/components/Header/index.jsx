import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import User from "./user.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";
import { useUser } from "../../contexts/UserContext";
import { useClients } from "../../contexts/ClientContext";

import styles from "./index.module.css";

function Header() {
  const { user, logoutUser } = useUser();
  const { clients, loading } = useClients();
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const onLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const mainCompany = clients?.find((client) => client.is_main);

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
        <div className={styles.header_info}>
          <div>
            {user?.username}
            <br />
            <b>{loading ? "-" : mainCompany?.name}</b>
          </div>
          <div>{user?.role}</div>
        </div>
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
                <Button variant="link" onClick={onLogout}>
                  Log Out
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
