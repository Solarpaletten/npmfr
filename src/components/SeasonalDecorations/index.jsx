import React from 'react';
import { 
    seasonalEmojis, 
  } from '../../utils/seasonal';
    

const SeasonalDecorations = () => (
 <div className="relative overflow-hidden">
   <div className="absolute w-full h-full">
     {[...Array(20)].map((_, i) => (
       <span 
         key={i}
         className="absolute animate-snowfall"
         style={{
           left: `${Math.random() * 100}%`,
           animationDelay: `${Math.random() * 5}s`,
           fontSize: `${Math.random() * 20 + 10}px`
         }}
       >
         {seasonalEmojis[Math.floor(Math.random() * seasonalEmojis.length)]}
       </span>
     ))}

        <style>
        {`
            @keyframes snowfall {
            0% { transform: translateY(0) rotate(0deg); }
            100% { transform: translateY(100vh) rotate(360deg); }
            }
        `}
        </style>

   </div>
 </div>
);

export default SeasonalDecorations;