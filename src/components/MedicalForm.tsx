import React, { useState } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Typography,
  SelectChangeEvent,
} from '@mui/material';

interface FormData {
  age: string;
  gender: string;
  weight: string;
  symptoms: string;
  medicalHistory: string;
}

export const MedicalForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    age: '',
    gender: '',
    weight: '',
    symptoms: '',
    medicalHistory: '',
  });
  const [response, setResponse] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your LangChain backend
    setResponse('Form submitted successfully! The AI is processing your information...');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          فرم اطلاعات بیمار
        </Typography>
        
        <Box sx={{ display: 'grid', gap: 3 }}>
          <TextField
            required
            name="age"
            label="سن"
            type="number"
            value={formData.age}
            onChange={handleChange}
            fullWidth
          />

          <FormControl required fullWidth>
            <InputLabel>جنسیت</InputLabel>
            <Select
              name="gender"
              value={formData.gender}
              label="Gender"
              onChange={handleChange}
            >
              <MenuItem value="male">مرد</MenuItem>
              <MenuItem value="female">زن</MenuItem>
              <MenuItem value="other">نا معلوم</MenuItem>
            </Select>
          </FormControl>

          <TextField
            required
            name="weight"
            label="وزن به کیلوگرم "
            type="number"
            value={formData.weight}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            required
            name="symptoms"
            label="علاعم بالینی"
            multiline
            rows={4}
            value={formData.symptoms}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            required
            name="medicalHistory"
            label="سابقه پزشکی"
            multiline
            rows={4}
            value={formData.medicalHistory}
            onChange={handleChange}
            fullWidth
          />

          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            size="large"
            sx={{ mt: 2 }}
          >
            ارسال کنید
          </Button>
        </Box>
      </Paper>

      {response && (
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            پاسخ هوش مصنوعی
          </Typography>
          <Typography>
            {response}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};