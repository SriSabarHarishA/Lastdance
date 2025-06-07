// src/components/EmployeeTable.jsx
import React from 'react';

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  if (employees.length === 0) {
    return <p className="text-gray-600 text-center py-4">No employees found. Create one!</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">S.No.</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Name</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Employee ID</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Active</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b text-sm text-gray-700">{index + 1}</td>
              <td className="py-3 px-4 border-b text-sm text-gray-700">{employee.name}</td>
              <td className="py-3 px-4 border-b text-sm text-gray-700">{employee.id}</td>
              <td className="py-3 px-4 border-b text-sm text-gray-700">
                <span className="bg-green-200 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Active</span>
              </td>
              <td className="py-3 px-4 border-b text-sm">
                <button
                  onClick={() => onEdit(employee)}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold py-1.5 px-3 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(employee.id)}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-1.5 px-3 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;