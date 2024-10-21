import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Field from '../Field';
import Form from '../Form';
import Button from '../Button';
import Error from '../Error';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('All fields are required!');
      return;
    }

    console.log('User logged in:', { email, password });

    setEmail('');
    setPassword('');
    setError('');

    if (onLogin) {
      onLogin();
    } else {
      navigate('/clients');
    }
  };

  return (
    <Form>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <Field
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Field
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Error error={error} />
        <div>
          <Button type="submit">Login</Button>
          <Button type="button" onClick={() => navigate('/')}>Home</Button>
        </div>
      </form>
    </Form>
  );
}

export default LoginForm;
