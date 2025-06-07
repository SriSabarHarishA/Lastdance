// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EmployeeTable from '../components/EmployeeTable';
import CreateEmployeeModal from '../components/CreateEmployeeModal';

const AdminDashboard = ({ employees, addEmployee, updateEmployee, deleteEmployee }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null); // Employee object if in edit mode

  const handleEditClick = (employee) => {
    setEditingEmployee(employee);
    setShowCreateModal(true); // Reuse create modal for editing
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setEditingEmployee(null); // Reset editing employee
  };

  return (
    <div className="container mx-auto p-4 mt-20">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-lg"
        >
          Create Employee
        </button>
        <Link to="/attendance-entry">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded shadow-lg">
            Attendance Entry
          </button>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Total Employees</h2>
        <EmployeeTable
          employees={employees}
          onEdit={handleEditClick}
          onDelete={deleteEmployee}
        />
      </div>

      {showCreateModal && (
        <CreateEmployeeModal
          onClose={handleCloseModal}
          addEmployee={addEmployee}
          updateEmployee={updateEmployee}
          editingEmployee={editingEmployee}
        />
      )}
    </div>
  );
};

export default AdminDashboard;