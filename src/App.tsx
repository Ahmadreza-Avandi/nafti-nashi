import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Activity } from 'lucide-react';
import { ThemeProvider } from './theme/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { MedicalForm } from './components/MedicalForm';

function App() {
  return (
    <ThemeProvider>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(45deg, rgba(76,175,80,0.1) 0%, rgba(76,175,80,0.05) 100%)',
          transition: 'background-color 0.3s ease',
        }}
      >
        <ThemeToggle />
        <Container maxWidth="lg" sx={{ pt: 8, pb: 6 }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Activity size={48} color="#4CAF50" />
            <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'primary.main' }}>
              دستیار پزشکی
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              برای کمک های پزشکی مبتنی بر هوش مصنوعی، اطلاعات بیمار را در زیر وارد کنید
            </Typography>
          </Box>
          <MedicalForm />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;