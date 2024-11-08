import React, { useState, useContext } from 'react';
import {
  Button,
  Card,
  Elevation,
  FormGroup,
  InputGroup,
  H1,
  Callout
} from '@blueprintjs/core';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import ThemeToggle from '../ThemeToggle';
import './Login.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(formData);

      const userRole = localStorage.getItem('userRole');
      console.log('Retrieved role from localStorage:', userRole);

      if (userRole === 'admin') {
        navigate('/admin/dashboard');
      } else if (userRole === 'business_owner') {
        navigate('/business/dashboard');
      } else {
        setError('Invalid role');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <Card elevation={Elevation.TWO} className="login-card">
        <div className="theme-toggle-container">
          <ThemeToggle />
        </div>
        <H1 className="login-title">Login</H1>
        <form onSubmit={handleSubmit} className="login-form">
          <FormGroup
            label="Username"
            labelFor="username"
            labelInfo="(required)"
            helperText={error && (
              <Callout intent="danger" icon="error">
                {error}
              </Callout>
            )}
          >
            <InputGroup
              id="username"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </FormGroup>
          <FormGroup
            label="Password"
            labelFor="password"
            labelInfo="(required)"
          >
            <InputGroup
              id="password"
              name="password"
              placeholder="Enter password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </FormGroup>
          <Button type="submit" intent="primary" text="Login" />
        </form>
        <div className="login-links">
          <Link to="/register">Register Now</Link>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;