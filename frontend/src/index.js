import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Импорт компонента App
import './index.css'; // Импорт стилей
import reportWebVitals from './reportWebVitals'; // Импорт функции для сбора метрик

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Вызов функции для сбора метрик
reportWebVitals(console.log); // Вы можете передать свою функцию для обработки метрик
