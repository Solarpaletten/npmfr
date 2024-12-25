// src/components/FestiveWrapper/index.jsx
import React from 'react';
import { Sparkle, Gift, Star  } from 'lucide-react';
import confetti from 'canvas-confetti';

const FestiveWrapper = ({ children }) => {
  const launchConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div onClick={launchConfetti} className="festive-container">
      <div className="sparkle-header">
        <Sparkle className="text-yellow-400 animate-bounce" />
        <Gift className="text-yellow-400 animate-bounce" />
        <Star className="text-yellow-400 animate-bounce" />
        {children}
      </div>
    </div>
  );
};

export default FestiveWrapper;