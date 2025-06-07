// src/components/Alert.jsx
import React from 'react';

const Alert = ({ type, message }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const textColor = 'text-white';

  return (
    <div className={`fixed top-16 left-1/2 -translate-x-1/2 p-3 rounded-md shadow-lg z-50 ${bgColor} ${textColor} transition-opacity duration-300 ease-in-out`}>
      {message}
    </div>
  );
};

export default Alert;