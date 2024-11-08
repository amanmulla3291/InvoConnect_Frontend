import React, { useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { OverlayToaster, Position } from '@blueprintjs/core';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

// Import components
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import BusinessOwnerDashboard from './components/Dashboard/BusinessOwnerDashboard';
import NotFound from './components/NotFound';

// Import Blueprint core CSS
import '@blueprintjs/core/lib/css/blueprint.css';
import './index.css';

// Create the Toaster instance outside the component
const toaster = OverlayToaster.create({
  position: Position.TOP,
});

const App = () => {
  const toasterRef = useRef(toaster);

  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <ErrorBoundary>
            {/* Toaster for displaying notifications */}
            {/* The Toaster instance is created outside the component */}
            
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Protected Routes */}
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/business/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['business_owner']}>
                    <BusinessOwnerDashboard />
                  </ProtectedRoute>
                } 
              />

              {/* Redirect to login on root path */}
              <Route path="/" element={<Navigate to="/login" replace />} />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;