import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const BusinessOwnerDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // Redirect to login page if user is not logged in
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return <p>Loading...</p>; // Or any other fallback UI
  }

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <p>Your UID: {user.uid}</p>
      {/* Add Invoice and Estimate Management Components */}
    </div>
  );
};

export default BusinessOwnerDashboard;