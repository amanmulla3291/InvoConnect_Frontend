import React from 'react';
import { Button, Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button
      icon={<Icon icon={isDark ? IconNames.FLASH : IconNames.MOON} />}
      onClick={toggleTheme}
      minimal
    >
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </Button>
  );
};

export default ThemeToggle;