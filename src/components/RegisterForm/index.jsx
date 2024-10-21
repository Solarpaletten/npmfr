import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Field from '../Field';
import Form from '../Form';
import Button from '../Button';
import Error from '../Error';

function RegisterForm({ onRegister }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError('All fields are required!');
      return;
    }

    console.log('User registered:', { username, email, password });

    setUsername('');
    setEmail('');
    setPassword('');
    setError('');

    if (onRegister) {
      onRegister();
    } else {
      navigate('/login');
    }
  };

  return (
    <Form>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <Field
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
          <Button type="submit">Register</Button>
          <Button type="button" onClick={() => navigate('/')}>Home</Button>
        </div>
      </form>
    </Form>
  );
}

export default RegisterForm;
