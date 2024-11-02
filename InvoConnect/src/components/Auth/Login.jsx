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

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
    } catch (err) {
      setError(err.message);
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
        <H1 style={{ textAlign: 'center', margin: '20px 0' }}>Login</H1>
        {error && (
          <Callout intent="danger" style={{ marginBottom: '20px' }}>
            {error}
          </Callout>
        )}
        <form onSubmit={handleSubmit} style={{ padding: '0 20px' }}>
          <FormGroup label="Username" labelFor="username" labelInfo="(required)">
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
          <FormGroup label="Password" labelFor="password" labelInfo="(required)">
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
          <Button
            type="submit"
            intent="primary"
            large
            fill
            style={{ marginTop: '20px' }}
          >
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;