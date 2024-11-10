import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Field from "../../components/Field";
import Form from "../../components/Form";
import Button from "../../components/Button";
import ValidationError from "../../components/ValidationError";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import api from "../../utils/api";

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('All fields are required!');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { token } = await api.post('/auth/login', {
        email,
        password,
      });

      // Сохраняем токен
      localStorage.setItem('token', token);
      console.log('Token saved:', token); // Для отладки

      // Очищаем форму
      setEmail('');
      setPassword('');
      setError('');

      // Перенаправляем на главную
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed, please check your credentials');
    } finally {
      setLoading(false);
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
        <ValidationError error={error} />
        <div>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          <Button icon={faArrowLeft} onClick={() => navigate('/')}>
            Back to Home page
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default LoginForm;