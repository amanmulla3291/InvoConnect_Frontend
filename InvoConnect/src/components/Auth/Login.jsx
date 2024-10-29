// src/components/Auth/Login.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {
  Button,
  Form,
  FormGroup,
  TextInput,
  Page,
  PageSection,
  PageSectionVariants,
  Title
} from '@patternfly/react-core';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (value, event) => {
    setFormData({ ...formData, [event.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <Page>
      <PageSection variant={PageSectionVariants.light}>
        <Title headingLevel="h1">Login</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup label="Username" isRequired fieldId="username">
            <TextInput
              isRequired
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup label="Password" isRequired fieldId="password">
            <TextInput
              isRequired
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </FormGroup>
          <Button type="submit">Login</Button>
        </Form>
      </PageSection>
    </Page>
  );
};

export default Login;