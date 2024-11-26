import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./index.module.css";

const Salary = () => {
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
};

export default Salary;