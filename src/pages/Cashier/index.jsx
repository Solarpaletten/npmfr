import React, { useState } from 'react';
import Page from '../../components/Page';

import styles from './index.module.css';

function Cashier({ onLogout }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <Page loading={loading} error={error} onLogout={onLogout}>
      Documents
    </Page>
  );
}

export default Cashier;
