import React, { useState } from 'react';
import { Button, Card, Elevation, FormGroup, InputGroup, H1, Callout } from '@blueprintjs/core';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setEmail(event.target.value);

    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Mock forgot password logic for testing purposes
      if (email === 'test@example.com') {
        setSuccess('Password reset instructions have been sent to your email.');
      } else {
        throw new Error('Email not found');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="forgot-password-container">
      <Card elevation={Elevation.TWO} className="forgot-password-card">
        <H1 className="forgot-password-header">Forgot Password</H1>
        {error && (
          <Callout intent="danger" className="forgot-password-error">
            {error}
          </Callout>
        )}
        {success && (
          <Callout intent="success" className="forgot-password-success">
            {success}
          </Callout>
        )}
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <FormGroup label="Email" labelFor="email" labelInfo="(required)">
            <InputGroup
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </FormGroup>
          <Button
            type="submit"
            intent="primary"
            large
            fill
            style={{ marginTop: '20px' }}
          >
            Send Reset Instructions
          </Button>
        </form>
        <div className="forgot-password-options">
          <Button minimal onClick={() => navigate('/login')}>Back to Login</Button>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword;