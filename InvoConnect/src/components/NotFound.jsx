import React from 'react';
import { 
  Card, 
  Elevation, 
  H1, 
  Button, 
  Intent, 
  Icon, 
  Callout 
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ margin: '10px', alignSelf: 'flex-end' }}>
        <ThemeToggle />
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card elevation={Elevation.THREE} style={{ width: '400px', textAlign: 'center' }}>
          <Icon icon={IconNames.ERROR} intent={Intent.WARNING} size={50} />
          <H1>404: Page Not Found</H1>
          <Callout intent={Intent.WARNING}>
            The page you are looking for does not exist or has been moved.
          </Callout>
          <Button 
            intent={Intent.PRIMARY} 
            onClick={handleGoHome} 
            style={{ marginTop: '20px' }}
          >
            Return to Login
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
