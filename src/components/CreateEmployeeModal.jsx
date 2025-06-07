// src/components/CreateEmployeeModal.jsx
import React, { useState, useEffect } from 'react';

const CreateEmployeeModal = ({ onClose, addEmployee, updateEmployee, editingEmployee }) => {
  const [employeeName, setEmployeeName] = useState('');

  useEffect(() => {
    if (editingEmployee) {
      setEmployeeName(editingEmployee.name);
    } else {
      setEmployeeName('');
    }
  }, [editingEmployee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (employeeName.trim() === '') {
      alert('Employee name cannot be empty.');
      return;
    }

    if (editingEmployee) {
      updateEmployee({ ...editingEmployee, name: employeeName });
    } else {
      addEmployee(employeeName);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl relative w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {editingEmployee ? 'Edit Employee' : 'Create New Employee'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="employeeName" className="block text-gray-700 text-sm font-bold mb-2">
              Employee Name:
            </label>
            <input
              type="text"
              id="employeeName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              required
            />
          </div>
          {editingEmployee && (
            <div className="mb-4 text-gray-600 text-sm">
              <p>Employee ID: <span className="font-semibold">{editingEmployee.id}</span></p>
              <p>Default Password: <span className="font-semibold">1234</span> (Password not editable here)</p>
            </div>
          )}
          <div className="flex items-center justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {editingEmployee ? 'Update Employee' : 'Create Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployeeModal;