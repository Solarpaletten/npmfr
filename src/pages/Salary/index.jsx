import React, { useState } from 'react';
import Page from '../../components/Page';

import styles from './index.module.css';

function Salary({ onLogout }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <Page loading={loading} error={error} onLogout={onLogout}>
      Salary
    </Page>
  );
}

export default Salary;
