import React, { useState } from "react";
import Page from "../../components/Page";

import styles from "./index.module.css";

function Assets() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <Page loading={loading} error={error}>
      Assets
    </Page>
  );
}

export default Assets;
