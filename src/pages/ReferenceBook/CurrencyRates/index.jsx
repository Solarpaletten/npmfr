import React from "react";
import Page from "../../../components/Page";

import styles from "./index.module.css";

const CurrencyRates = () => {
  return (
    <Page loading={false} error={""}>
      <h1>Currency Rates</h1>
      <div className={styles}>fix it</div>
    </Page>
  );
};

export default CurrencyRates;
