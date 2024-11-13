import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Field from '../../components/Field';
import Form from '../../components/Form';
import Button from '../../components/Button';
import ValidationError from '../../components/ValidationError';
import api from '../../utils/api';

import styles from './index.module.css';

function RegisterForm({ onRegister }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError('All fields are required!');
      return;
    }

    const registerUser = async (username, email, password) => {
      setLoading(true);
      setError(null);

      try {
        const data = await api.post('/auth/register', {
          username,
          email,
          password,
        });

        console.log('User registered successfully:', data);

        setUsername('');
        setEmail('');
        setPassword('');
        setError('');

        onRegister();
      } catch (error) {
        setError('Registration failed, please try again');
      } finally {
        setLoading(false);
      }
    };

    registerUser(username, email, password);
  };

  return (
    <Form>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <Field
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
          {loading ? 'Registering...' : 'Register'}
        </Button>
        <Button className={styles.button} onClick={() => navigate('/login')}>
          Go to Login
        </Button>
      </form>
    </Form>
  );
}

export default RegisterForm;
