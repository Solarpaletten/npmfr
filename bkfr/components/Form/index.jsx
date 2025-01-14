import React from "react";
import MaimPicture from "./main_picture.svg";
import Logo from "./Solar_3.svg";

import styles from "./index.module.css";

function Form({ children }) {
  return (
    <div className={styles.container_form}>
      <div className={styles.gradient}>
        <div>
          <img className={styles.logo} src={Logo} alt="Solar logo" />
        </div>
        <div className={styles.container_picture}>
          <img
            className={styles.picture}
            src={MaimPicture}
            alt="Main visual representation"
          />
        </div>
      </div>
      <div className={styles.form}>{children}</div>
    </div>
  );
}

export default Form;
