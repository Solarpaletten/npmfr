import React from "react";
import Page from "../../../components/Page";

import styles from "./index.module.css";

const Maintenance = () => {
  return (
    <Page loading={false} error={""}>
      <h1>Maintenance</h1>
      <div className={styles}>fix it</div>
    </Page>
  );
};

export default Maintenance;
