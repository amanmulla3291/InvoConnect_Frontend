import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create AuthContext
export const AuthContext = createContext({
  user: null,
  login: () => {},
  register: () => {},
  logout: () => {},
  isAuthenticated: false,
});

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check for user in localStorage
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  // Mock users storage (replace with your backend logic)
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const savedUsers = localStorage.getItem('registeredUsers');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  // Effect to save registered users to localStorage
  useEffect(() => {
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  const register = (userData) => {
    // Check if username already exists
    const existingUser = registeredUsers.find(
      u => u.username === userData.username
    );

    if (existingUser) {
      throw new Error('Username already exists');
    }

    // Add new user
    const newUser = { 
      ...userData, 
      role: userData.username.includes('admin') ? 'admin' : 'business_owner' 
    };
    
    const updatedUsers = [...registeredUsers, newUser];
    setRegisteredUsers(updatedUsers);

    // Automatically log in after registration
    login(newUser);
  };

  const login = (userData) => {
    // Validate user exists
    const user = registeredUsers.find(
      u => u.username === userData.username
    );

    if (!user) {
      throw new Error('User not found');
    }

    // Set user and authentication state
    setUser(user);
    setIsAuthenticated(true);
    
    // Save user to localStorage
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  // Provide context value
  const contextValue = {
    user,
    login,
    register,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for authentication
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Protected Route Component
export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate('/login');
      return;
    }

    // Check role-based access if roles are specified
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      // Redirect to unauthorized page or dashboard
      navigate('/dashboard');
    }
  }, [isAuthenticated, user, navigate, allowedRoles]);

  // Render children if authenticated and has required role
  return isAuthenticated ? children : null;
};