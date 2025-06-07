// src/pages/AttendancePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AttendancePage = ({ markAttendance }) => {
  const [employeeId, setEmployeeId] = useState('');
  const navigate = useNavigate();

  const handleMarkAttendance = (e) => {
    e.preventDefault();
    if (employeeId.trim() === '') {
      alert('Please enter Employee ID.');
      return;
    }
    markAttendance(employeeId);
    setEmployeeId(''); // Clear input after marking
  };

  return (
    <div className="container mx-auto p-4 mt-20">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/admin-dashboard')}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full mr-4"
          aria-label="Back to Admin Dashboard"
        >
          &larr; Back
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Attendance Entry</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Mark Employee Attendance</h2>
        <form onSubmit={handleMarkAttendance}>
          <div className="mb-4">
            <label htmlFor="employeeId" className="block text-gray-700 text-sm font-bold mb-2">
              Enter Employee ID:
            </label>
            <input
              type="text"
              id="employeeId"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value.toUpperCase())} // Convert to uppercase
              placeholder="e.g., EMP001"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Mark Attendance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AttendancePage;