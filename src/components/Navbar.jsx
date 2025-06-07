// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';

const Navbar = ({ isLoggedIn, userType, onLogout, onLogin, employees }) => {
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [showEmployeeLoginModal, setShowEmployeeLoginModal] = useState(false);
  const navigate = useNavigate();

  const handleAdminLogin = (username, password) => {
    if (username === 'admin' && password === 'admin') {
      onLogin('admin', true);
      navigate('/admin-dashboard');
      setShowAdminLoginModal(false);
    } else {
      onLogin('admin', false);
    }
  };

  const handleEmployeeLogin = (employeeId, password) => {
    const employee = employees.find(emp => emp.id === employeeId && emp.password === password);
    if (employee) {
      onLogin('employee', true, employee);
      navigate('/employee-dashboard');
      setShowEmployeeLoginModal(false);
    } else {
      onLogin('employee', false);
    }
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate('/'); // Redirect to home on logout
  };

  return (
    <>
      <nav className="bg-blue-600 p-4 text-white shadow-md fixed top-0 w-full z-10 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Dashboard</Link>
        <div>
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => setShowAdminLoginModal(true)}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Admin Login
              </button>
              <button
                onClick={() => setShowEmployeeLoginModal(true)}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
              >
                Employee Login
              </button>
            </>
          ) : (
            <button
              onClick={handleLogoutClick}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {showAdminLoginModal && (
        <LoginModal
          title="Admin Login"
          onClose={() => setShowAdminLoginModal(false)}
          onLogin={handleAdminLogin}
          isEmployeeLogin={false}
        />
      )}

      {showEmployeeLoginModal && (
        <LoginModal
          title="Employee Login"
          onClose={() => setShowEmployeeLoginModal(false)}
          onLogin={handleEmployeeLogin}
          isEmployeeLogin={true}
          employees={employees} // Pass employees for employee login
        />
      )}
    </>
  );
};

export default Navbar;