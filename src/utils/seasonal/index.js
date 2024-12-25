// src/utils/seasonal/index.js

// Базовые эмодзи и иконки
export const seasonalEmojis = {
    winter: ["❄️", "⛄", "🎄", "🎁", "🦌"],
    holiday: ["🎅", "🤶", "🎄", "🎁", "✨"],
    newyear: ["🎉", "🎊", "🥂", "🍾", "🎆"]
  };
  
  // Цветовые схемы
  export const seasonalColors = {
    winter: {
      primary: '#1e88e5',
      secondary: '#90caf9',
      accent: '#e3f2fd'
    }
  };
  
  // Анимации
  export const seasonalAnimations = {
    snowfall: {
      keyframes: `@keyframes snowfall {
        0% { transform: translateY(0) rotate(0deg); }
        100% { transform: translateY(100vh) rotate(360deg); }
      }`,
      duration: '5s',
      timing: 'linear',
      iteration: 'infinite'
    }
  };
  
  // Готовые компоненты
  export const seasonalComponents = {
    SnowEffect: {
      count: 20,
      emoji: '❄️',
      minSize: 10,
      maxSize: 30
    }
  };