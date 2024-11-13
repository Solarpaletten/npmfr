import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

import styles from './index.module.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1>Welcome to the Home Page</h1>
      <p>This is the initial home page of the application.</p>
      <div>
        <Button
          className={styles.button}
          variant='primary'
          onClick={() => navigate('/register')}
        >
          Register
        </Button>
        <Button
          className={styles.button}
          variant='primary'
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default Home;
