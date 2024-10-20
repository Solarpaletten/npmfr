import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate(); // Хук для навигации

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Welcome to the Home Page</h1>
      <p>This is the initial home page of the application.</p>

      {/* Добавляем кнопки для регистрации и логина */}
      <button
        style={{ marginRight: '10px', padding: '10px 20px', fontSize: '16px' }}
        onClick={() => navigate('/register')}
      >
        Register
      </button>
      <button
        style={{ padding: '10px 20px', fontSize: '16px' }}
        onClick={() => navigate('/login')}
      >
        Login
      </button>
    </div>
  );
}

export default Home;
