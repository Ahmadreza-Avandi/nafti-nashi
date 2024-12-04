import React from 'react';
import { IconButton, useTheme as useMUITheme } from '@mui/material';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const theme = useMUITheme();

  return (
    <IconButton
      onClick={toggleTheme}
      sx={{
        position: 'absolute',
        top: 16,
        right: 16,
        color: theme.palette.primary.main,
      }}
    >
      {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
    </IconButton>
  );
};