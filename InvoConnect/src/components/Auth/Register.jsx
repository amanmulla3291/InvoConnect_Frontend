// src/components/Auth/Register.jsx
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
import { AuthContext } from '../../context/AuthContext';
import ThemeToggle from '../ThemeToggle';

const Register = () => {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Generate unique 4-digit UID
        const uid = Math.floor(1000 + Math.random() * 9000);

        // Only pass username and uid to register function
        await register({
          username: formData.username,
          uid
        });
      } catch (error) {
        setErrors({ submit: error.message });
      }
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px'
      }}
    >
      <Card elevation={Elevation.TWO} style={{ maxWidth: '400px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
          <ThemeToggle />
        </div>
        <H1 style={{ textAlign: 'center', margin: '20px 0' }}>Register</H1>
        <form onSubmit={handleSubmit} style={{ padding: '0 20px' }}>
          <FormGroup
            label="Username"
            labelFor="username"
            labelInfo="(required)"
            helperText={errors.username && (
              <Callout intent="danger" icon="error">
                {errors.username}
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
            />
          </FormGroup>
          <FormGroup
            label="Password"
            labelFor="password"
            labelInfo="(required)"
            helperText={errors.password && (
              <Callout intent="danger" icon="error">
                {errors.password}
              </Callout>
            )}
          >
            <InputGroup
              id="password"
              name="password"
              placeholder="Enter password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup
            label="Confirm Password"
            labelFor="confirmPassword"
            labelInfo="(required)"
            helperText={errors.confirmPassword && (
              <Callout intent="danger" icon="error">
                {errors.confirmPassword}
              </Callout>
            )}
          >
            <InputGroup
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </FormGroup>
          {errors.submit && (
            <Callout intent="danger" style={{ marginTop: '10px' }}>
              {errors.submit}
            </Callout>
          )}
          <Button
            type="submit"
            intent="primary"
            large
            fill
            style={{ marginTop: '20px' }}
          >
            Register
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Register;