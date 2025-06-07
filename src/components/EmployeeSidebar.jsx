// src/components/EmployeeSidebar.jsx
import React from 'react';

const EmployeeSidebar = ({ setActiveTab, activeTab }) => {
  const navItems = [
    { id: 'attendanceReport', name: 'Attendance Report' },
    { id: 'foodRequest', name: 'Food Request' },
    { id: 'leaveApply', name: 'Leave Apply' },
    { id: 'feedback', name: 'Feedback' },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold mb-6">Employee Menu</h2>
      <ul>
        {navItems.map((item) => (
          <li key={item.id} className="mb-2">
            <button
              onClick={() => setActiveTab(item.id)}
              className={`block w-full text-left py-2 px-4 rounded-md transition duration-200
                ${activeTab === item.id ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'}`}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeSidebar;