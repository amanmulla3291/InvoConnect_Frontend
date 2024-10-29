// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import BusinessOwnerDashboard from './components/Dashboard/BusinessOwnerDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import ThemeToggle from './components/ThemeToggle';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <ThemeToggle />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<BusinessOwnerDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;