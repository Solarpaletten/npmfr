// src/pages/Bank/BankOperations/components/ActionButton/index.jsx
import React from 'react';

const ActionButton = ({ icon: Icon, label, variant = 'default', badge }) => {
  // Базовые стили для всех кнопок
  const baseStyles = 'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded border';
  
  // Варианты стилей с конкретными цветами Tailwind
  const variants = {
    default: 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300',
    success: 'bg-green-500 hover:bg-green-600 text-white border-green-600',
    danger: 'bg-red-500 hover:bg-red-600 text-white border-red-600',
    print: 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`}>
      <Icon size={16} className="shrink-0" />
      {label}
      {badge && (
        <span className="ml-1 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </button>
  );
};

export default ActionButton;