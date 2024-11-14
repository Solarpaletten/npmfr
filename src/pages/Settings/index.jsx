import React, { useState } from "react";
import Page from "../../components/Page";

import styles from "./index.module.css";

function Settings() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <Page loading={loading} error={error}>
      Settings
    </Page>
  );
}

export default Settings;
