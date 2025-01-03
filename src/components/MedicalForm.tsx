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
  CircularProgress,
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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>(''); // برای ذخیره پیغام خطا

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // شروع بارگذاری
    setError(''); // پاک کردن خطای قبلی

    const { age, gender, weight, symptoms, medicalHistory } = formData;
    const url = "https://haji-api.ir/chatgpt-3.5/"; // URL برای API شما
    const params = {
      license: "WQL6s028NXNKa49551196091391144dhac",
      chatId: "ovfwmhie58zfqzhe38hc5kbrjvmzzilj",
      text: `سن: ${age}، جنسیت: ${gender}، وزن: ${weight}، علائم: ${symptoms}، سابقه پزشکی: ${medicalHistory} (با توجه به اطلاعات یه نسخه خیلی ساده بده)`
    };

    try {
      const response = await fetch(url, {
        method: 'POST', // تغییر متد به POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params), // ارسال اطلاعات در بدنه درخواست
      });

      if (!response.ok) {
        throw new Error('خطای API: اتصال برقرار نشد.');
      }

      const data = await response.json();
      if (data.ok) {
        setResponse(data.answer || 'جواب ندارم.');
      } else {
        setResponse('مشکلی در دریافت پاسخ وجود دارد.');
      }
    } catch (error: any) {
      setError(`خطا: ${error.message}`);
    } finally {
      setLoading(false); // پایان بارگذاری
    }
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
              label="جنسیت"
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
            disabled={loading} // دکمه در حالت بارگذاری غیرفعال می‌شود
          >
            {loading ? 'در حال پردازش...' : 'ارسال کنید'}
          </Button>
        </Box>
      </Paper>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {response && !loading && !error && (
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            پاسخ هوش مصنوعی
          </Typography>
          <Typography>
            {response}
          </Typography>
        </Paper>
      )}

      {error && (
        <Paper elevation={3} sx={{ p: 3, mt: 3, backgroundColor: '#f8d7da' }}>
          <Typography variant="h6" gutterBottom color="error">
            خطا
          </Typography>
          <Typography color="error">
            {error}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};
