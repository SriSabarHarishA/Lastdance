// src/pages/Home.jsx
import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center bg-gray-50 p-6 rounded-lg shadow-md mt-20">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
        Welcome to the Employee Management Dashboard
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Please use the navigation bar above to log in as an Admin or an Employee.
      </p>
      <div className="flex space-x-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs transition transform hover:scale-105 duration-300">
          <h2 className="text-xl font-semibold text-blue-700 mb-3">Admin Features</h2>
          <ul className="list-disc list-inside text-left text-gray-700">
            <li>Manage Employees (Create, Edit, Delete)</li>
            <li>Track Attendance (Mark IN/OUT)</li>
            <li>View Overall Records</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs transition transform hover:scale-105 duration-300">
          <h2 className="text-xl font-semibold text-green-700 mb-3">Employee Features</h2>
          <ul className="list-disc list-inside text-left text-gray-700">
            <li>View Personal Attendance Report</li>
            <li>Submit Food Requests</li>
            <li>Apply for Leave</li>
            <li>Provide Feedback</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;