import React, { useState } from "react";
import Page from "../../components/Page";

import styles from "./index.module.css";

function Cashier() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <Page loading={loading} error={error}>
      Documents
    </Page>
  );
}

export default Cashier;
