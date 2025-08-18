import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthLayout } from './components/layout/AuthLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';

// Auth Pages
import { Login } from './pages/Login';

// Dashboard Pages
import { Dashboard } from './pages/Dashboard';
import { Timetable } from './pages/Timetable';
import { Grades } from './pages/Grades';
import { Rankings } from './pages/Rankings';
import { Classmates } from './pages/Classmates';
import { Attendance } from './pages/Attendance';
import { Payments } from './pages/Payments';
import { Fees } from './pages/Fees';
import { SchoolInfo } from './pages/SchoolInfo';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="timetable" element={<Timetable />} />
            <Route path="grades" element={<Grades />} />
            <Route path="rankings" element={<Rankings />} />
            <Route path="classmates" element={<Classmates />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="payments" element={<Payments />} />
            <Route path="fees" element={<Fees />} />
            <Route path="school-info" element={<SchoolInfo />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;