import React, { useState } from 'react';
import Page from '../../components/Page';

import styles from './index.module.css';

function GeneralLedger() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <Page loading={loading} error={error}>
      GeneralLedger
    </Page>
  );
}

export default GeneralLedger;
