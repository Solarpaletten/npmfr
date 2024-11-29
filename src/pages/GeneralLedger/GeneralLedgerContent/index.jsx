import React from "react";
import Page from "../../../components/Page";

import styles from "./index.module.css";

const GeneralLedgerContent = () => {
  return (
    <Page loading={false} error={""}>
      <h1>GeneralLedgerContent</h1>
      <div className={styles}>fix it</div>
    </Page>
  );
};

export default GeneralLedgerContent;
