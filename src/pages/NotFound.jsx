// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center bg-gray-50 p-6 rounded-lg shadow-md mt-20">
      <h1 className="text-6xl font-extrabold text-red-600 mb-4">404</h1>
      <p className="text-2xl text-gray-700 mb-8">Page Not Found</p>
      <p className="text-lg text-gray-600 mb-8">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;