// src/components/LoginModal.jsx
import React, { useState } from 'react';

const LoginModal = ({ title, onClose, onLogin, isEmployeeLogin, employees = [] }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(userId, password);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl relative w-full max-w-sm">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">{title}</h2>
        <form onSubmit={handleSubmit}>
          {isEmployeeLogin ? (
            <div className="mb-4">
              <label htmlFor="employeeId" className="block text-gray-700 text-sm font-bold mb-2">
                Select Employee ID:
              </label>
              <select
                id="employeeId"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              >
                <option value="">-- Select Employee --</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.id} - {emp.name}</option>
                ))}
              </select>
            </div>
          ) : (
            <div className="mb-4">
              <label htmlFor="userId" className="block text-gray-700 text-sm font-bold mb-2">
                User ID:
              </label>
              <input
                type="text"
                id="userId"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>
          )}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;