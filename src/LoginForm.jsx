import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Простая валидация
    if (!email || !password) {
      setError('All fields are required!');
      return;
    }

    // Логика логина (например, проверка данных на сервере)
    console.log('User logged in:', { email, password });

    // Очистка формы
    setEmail('');
    setPassword('');
    setError('');

    // Вызываем функцию onLogin и перенаправляем на страницу клиентов
    if (onLogin) {
      onLogin();
    } else {
      navigate('/clients'); // Перенаправляем на страницу клиентов
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" style={{ marginTop: '10px', padding: '10px 20px' }}>
          Login
        </button>
        {/* Кнопка Домой */}
        <button
          type="button"
          style={{ marginLeft: '10px', padding: '10px 20px', marginTop: '10px' }}
          onClick={() => navigate('/')}
        >
          Home
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
// Compare this snippet from frontend/src/components/Header/Header.js: