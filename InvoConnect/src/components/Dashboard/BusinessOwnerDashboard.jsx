import React, { useEffect, useState } from 'react';
import { Card, Button, H1, Spinner, Alert } from '@blueprintjs/core';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle';
import { useAuth } from '../../context/AuthContext';
import './BusinessOwnerDashboard.css';

const BusinessOwnerDashboard = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating an API call
        const timer = setTimeout(() => {
          setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
      } catch (err) {
        setError(err);
        setLoading(false); // Stop loading on error
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert intent="danger" title="Error" message={error.message} />;
  }

  const handleCardClick = (cardType) => {
    switch (cardType) {
      case 'invoices':
        navigate('/invoices'); // Navigate to Invoices page
        break;
      case 'estimates':
        navigate('/estimates'); // Navigate to Estimates page
        break;
      case 'clients':
        navigate('/clients'); // Navigate to Clients page
        break;
      default:
        break;
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <H1>Welcome, {user?.username || 'Business Owner'}</H1>
        <div className="header-actions">
          <ThemeToggle />
          <Button 
            onClick={logout} 
            intent="none" 
            className="logout-button"
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="dashboard-grid">
        <Card 
          className="dashboard-card" 
          onClick={() => handleCardClick('invoices')}
        >
          <h4>Invoices</h4>
        </Card>
        <Card 
          className="dashboard-card" 
          onClick={() => handleCardClick('estimates')}
        >
          <h4>Estimates</h4>
        </Card>
        <Card 
          className="dashboard-card" 
          onClick={() => handleCardClick('clients')}
        >
          <h4>Clients</h4>
        </Card>
      </div>
    </div>
  );
};

export default BusinessOwnerDashboard;