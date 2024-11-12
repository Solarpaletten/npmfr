import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Field from '../../components/Field';
import Form from '../../components/Form';
import Button from '../../components/Button';
import ValidationError from '../../components/ValidationError';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import api from '../../utils/api';

import styles from './index.module.css';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('All fields are required!');
      return;
    }

    const loginUser = async (email, password) => {
      setLoading(true);
      setError(null);

      try {
        const { token, username, userId, role } = await api.post(
          '/auth/login',
          {
            email,
            password,
          }
        );

        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('userId', userId);
        localStorage.setItem('role', role);

        setEmail('');
        setPassword('');
        setError('');

        onLogin('/dashboard');
      } catch (error) {
        setError('Login failed, please check your credentials');
      } finally {
        setLoading(false);
      }
    };

    loginUser(email, password);
  };

  return (
    <Form>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <Field
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Field
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ValidationError error={error} />

        <Button
          className={styles.button}
          variant='primary'
          type='submit'
          disabled={loading}
        >
          {loading ? 'Logining...' : 'Login'}
        </Button>
        <Button
          className={styles.button}
          icon={faArrowLeft}
          onClick={() => navigate('/')}
        >
          Back to Home page
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
