// src/utils/emojis.js
export const seasonalEmojis = {
    winter: ["❄️", "⛄", "🎄", "🎁", "🦌", "☃️", "🌨️", "🧊", "🎿", "⛸️"],
    spring: ["🌸", "🌺", "🌷", "🌹", "🦋", "🐝", "🌱", "🌿", "🍀", "🌈"],
    summer: ["☀️", "🏖️", "🌊", "🏊‍♂️", "🍦", "🏄‍♂️", "⛱️", "🌴", "🍹", "🎐"],
    fall: ["🍁", "🍂", "🎃", "🦃", "🌰", "🍎", "🍄", "🥮", "🌾", "🥧"]
   };
   
   export const seasonalThemes = {
    winter: {
      colors: {
        primary: '#1e88e5', // зимний синий
        secondary: '#90caf9', // светло-синий
        accent: '#e3f2fd', // легкий синий
        snow: '#ffffff'
      },
      gradients: {
        header: 'linear-gradient(135deg, #1e88e5 0%, #90caf9 100%)',
        button: 'linear-gradient(45deg, #1e88e5 30%, #90caf9 90%)'
      },
      animations: {
        snowfall: `@keyframes snowfall {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(360deg); }
        }`
      }
    }
   };