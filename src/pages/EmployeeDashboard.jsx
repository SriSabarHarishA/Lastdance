// src/pages/EmployeeDashboard.jsx
import React, { useState } from 'react';
import EmployeeSidebar from '../components/EmployeeSidebar';

const EmployeeDashboard = ({ employee, attendanceRecords }) => {
  const [activeTab, setActiveTab] = useState('attendanceReport'); // Default tab

  const renderContent = () => {
    switch (activeTab) {
      case 'attendanceReport':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Your Attendance Report</h3>
            {attendanceRecords.length === 0 ? (
              <p className="text-gray-600">No attendance records found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Date</th>
                      <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">IN Time</th>
                      <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">OUT Time</th>
                      <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceRecords.map((record, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b text-sm text-gray-700">{record.date}</td>
                        <td className="py-3 px-4 border-b text-sm text-gray-700">{record.inTime}</td>
                        <td className="py-3 px-4 border-b text-sm text-gray-700">{record.outTime || '-'}</td>
                        <td className="py-3 px-4 border-b text-sm text-gray-700">{record.duration || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      case 'foodRequest':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Food Request</h3>
            <p className="text-gray-600">Submit your food requests here.</p>
            {/* Add a form for food requests */}
            <textarea className="w-full p-2 border rounded mt-4" rows="5" placeholder="Enter your food request..."></textarea>
            <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Submit Request</button>
          </div>
        );
      case 'leaveApply':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Leave Application</h3>
            <p className="text-gray-600">Apply for leave here.</p>
            {/* Add a form for leave application */}
            <input type="date" className="w-full p-2 border rounded mt-4" />
            <textarea className="w-full p-2 border rounded mt-4" rows="5" placeholder="Reason for leave..."></textarea>
            <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Apply Leave</button>
          </div>
        );
      case 'feedback':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Feedback</h3>
            <p className="text-gray-600">Share your feedback with us.</p>
            {/* Add a form for feedback */}
            <textarea className="w-full p-2 border rounded mt-4" rows="5" placeholder="Enter your feedback..."></textarea>
            <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Submit Feedback</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex container mx-auto p-4 mt-20">
      <EmployeeSidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      <div className="flex-grow p-6 bg-white rounded-lg shadow-md ml-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome, {employee.name}!</h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default EmployeeDashboard;