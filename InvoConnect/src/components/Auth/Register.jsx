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
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import ThemeToggle from '../ThemeToggle';
import './Register.css';

const Register = () => {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const uid = Math.floor(1000 + Math.random() * 9000);

        await register({
          username: formData.username,
          uid,
          role: formData.role
        });

        localStorage.setItem('userRole', formData.role);
        console.log('Role saved to localStorage:', localStorage.getItem('userRole'));

        navigate('/login');
      } catch (error) {
        if (error.message.includes('Username already exists')) {
          navigate('/login');
        } else {
          setErrors({ submit: error.message });
        }
      }
    }
  };

  return (
    <div className="register-container">
      <Card elevation={Elevation.TWO} className="register-card">
        <div className="theme-toggle-container">
          <ThemeToggle />
        </div>
        <H1 className="register-title">Register</H1>
        <form onSubmit={handleSubmit} className="register-form">
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
              autoComplete="username"
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
              autoComplete="new-password"
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
              autoComplete="new-password"
            />
          </FormGroup>
          <FormGroup
            label="Role"
            labelFor="role"
            labelInfo="(required)"
            helperText={errors.role && (
              <Callout intent="danger" icon="error">
                {errors.role}
              </Callout>
            )}
          >
            <div className="bp3-select">
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="business_owner">Business Owner</option>
              </select>
            </div>
          </FormGroup>
          <Button type="submit" intent="primary" text="Register" />
        </form>
      </Card>
    </div>
  );
};

export default Register;
