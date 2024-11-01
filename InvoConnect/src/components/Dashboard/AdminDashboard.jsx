import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Elevation,
  H1,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
  Spinner
} from '@blueprintjs/core';
import ThemeToggle from '../ThemeToggle';
import { useAuth } from '../../context/AuthContext';
//import './AdminDashboard.css';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (section) => {
    console.log(`Navigating to ${section}`);
    // Add your navigation logic here
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <Navbar className="bp3-dark">
        <NavbarGroup align="left">
          <NavbarHeading>Admin Dashboard</NavbarHeading>
        </NavbarGroup>
        <NavbarGroup align="right">
          <ThemeToggle />
          <NavbarDivider />
          <Button 
            text="Logout" 
            onClick={logout} 
            minimal 
            icon="log-out"
          />
        </NavbarGroup>
      </Navbar>

      <div style={{ padding: '20px' }}>
        <H1 style={{ marginBottom: '20px' }}>Admin Dashboard</H1>
        
        <div className="dashboard-grid">
          <Card onClick={() => handleCardClick('user-management')} elevation={Elevation.TWO}>
            <h3>User Management</h3>
          </Card>
          <Card onClick={() => handleCardClick('settings')} elevation={Elevation.TWO}>
            <h3>System Settings</h3>
          </Card>
          <Card onClick={() => handleCardClick('analytics')} elevation={Elevation.TWO}>
            <h3>Analytics</h3>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;