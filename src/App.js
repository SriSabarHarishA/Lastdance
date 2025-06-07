// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import AttendancePage from './pages/AttendancePage';
import EmployeeDashboard from './pages/EmployeeDashboard';
import NotFound from './pages/NotFound';
import Alert from './components/Alert';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null); // 'admin' or 'employee'
  const [loggedInEmployee, setLoggedInEmployee] = useState(null); // Stores employee object if employee logs in
  const [employees, setEmployees] = useState(() => {
    // Load initial employees from localStorage or use a default
    const savedEmployees = localStorage.getItem('employees');
    return savedEmployees ? JSON.parse(savedEmployees) : [
      { id: 'EMP001', name: 'Arun', password: '1234' },
      { id: 'EMP002', name: 'Bhavya', password: '1234' },
      { id: 'EMP003', name: 'Charan', password: '1234' },
    ];
  });
  const [attendanceRecords, setAttendanceRecords] = useState(() => {
    // Load initial attendance from localStorage
    const savedAttendance = localStorage.getItem('attendanceRecords');
    return savedAttendance ? JSON.parse(savedAttendance) : [];
  });

  const [alert, setAlert] = useState(null); // { type: 'success' | 'error', message: '' }

  // Save employees and attendance to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  const handleLogin = (type, success, userData = null) => {
    if (success) {
      setIsLoggedIn(true);
      setUserType(type);
      setLoggedInEmployee(userData);
      showAlert('success', 'Login Successful!');
    } else {
      showAlert('error', 'Login Failed. Please check your credentials.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setLoggedInEmployee(null);
    showAlert('success', 'Logged out successfully!');
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000); // Hide alert after 3 seconds
  };

  // Function to add a new employee
  const addEmployee = (employeeName) => {
    const newId = `EMP${String(employees.length + 1).padStart(3, '0')}`;
    const newEmployee = { id: newId, name: employeeName, password: '1234' }; // Default password
    setEmployees((prev) => [...prev, newEmployee]);
    showAlert('success', `Employee ${employeeName} added with ID: ${newId}`);
  };

  // Function to update employee details
  const updateEmployee = (updatedEmployee) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
    );
    showAlert('success', `Employee ${updatedEmployee.name} updated.`);
  };

  // Function to delete an employee
  const deleteEmployee = (employeeId) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== employeeId));
    showAlert('success', `Employee ID: ${employeeId} deleted.`);
  };

  // Function to mark attendance
  const markAttendance = (employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) {
      showAlert('error', 'Employee ID not found.');
      return false;
    }

    const now = new Date();
    const date = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const time = now.toLocaleTimeString(); // HH:MM:SS AM/PM

    const existingRecordIndex = attendanceRecords.findIndex(
      (rec) => rec.employeeId === employeeId && rec.date === date
    );

    let type;
    if (existingRecordIndex === -1) {
      // No record for today, so it's an IN
      type = 'IN';
      setAttendanceRecords((prev) => [
        ...prev,
        { employeeId, name: employee.name, date, inTime: time, outTime: null, duration: null },
      ]);
      showAlert('success', `Attendance Marked IN for ${employee.name} at ${time}`);
    } else {
      const record = attendanceRecords[existingRecordIndex];
      if (record.outTime) {
        // Already marked IN and OUT today, so it's another IN or just inform
        showAlert('error', `${employee.name} has already marked IN and OUT today.`);
        return false;
      } else {
        // Existing IN record, so it's an OUT
        type = 'OUT';
        const inTime = new Date(`${date}T${record.inTime}`); // Reconstruct Date object
        const outTime = now;
        const diffMs = outTime - inTime;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const duration = `${diffHours}h ${diffMinutes}m`;

        const updatedRecords = [...attendanceRecords];
        updatedRecords[existingRecordIndex] = {
          ...record,
          outTime: time,
          duration: duration,
        };
        setAttendanceRecords(updatedRecords);
        showAlert('success', `Attendance Marked OUT for ${employee.name} at ${time}`);
      }
    }
    return true;
  };


  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar isLoggedIn={isLoggedIn} userType={userType} onLogout={handleLogout} onLogin={handleLogin} employees={employees} />
        {alert && <Alert type={alert.type} message={alert.message} />}
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/admin-dashboard"
              element={
                isLoggedIn && userType === 'admin' ? (
                  <AdminDashboard
                    employees={employees}
                    addEmployee={addEmployee}
                    updateEmployee={updateEmployee}
                    deleteEmployee={deleteEmployee}
                    attendanceRecords={attendanceRecords}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/attendance-entry"
              element={
                isLoggedIn && userType === 'admin' ? (
                  <AttendancePage markAttendance={markAttendance} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/employee-dashboard"
              element={
                isLoggedIn && userType === 'employee' && loggedInEmployee ? (
                  <EmployeeDashboard employee={loggedInEmployee} attendanceRecords={attendanceRecords.filter(rec => rec.employeeId === loggedInEmployee.id)} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route path="*" element={<NotFound />} /> {/* Catch-all for 404 */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;