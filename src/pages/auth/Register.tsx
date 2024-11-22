import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Link,
  Box,
  Alert,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Eye, EyeOff, Github, Mail } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { MOCK_USERS } from '../../data/mockData';

export const Register = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeToTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!formData.agreeToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (MOCK_USERS.some(u => u.email === formData.email)) {
        throw new Error('Email already exists');
      }

      // Create new user (in real app, this would be handled by the backend)
      const newUser = {
        ...MOCK_USERS[0],
        id: `user-${Date.now()}`,
        name: formData.name,
        email: formData.email,
      };

      login(newUser);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthRegister = async (provider: string) => {
    setError('');
    setIsLoading(true);

    try {
      // Simulate OAuth API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = MOCK_USERS[0];
      login(mockUser);
      navigate('/');
    } catch (err) {
      setError(`${provider} registration failed`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 12 }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Create Account
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Join the PawfectLearning community
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={formData.agreeToTerms}
                onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                color="primary"
              />
            }
            label={
              <Typography variant="body2" color="text.secondary">
                I agree to the{' '}
                <Link href="#" color="primary">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="#" color="primary">
                  Privacy Policy
                </Link>
              </Typography>
            }
            sx={{ mt: 2 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            Create Account
          </Button>
        </Box>

        <Divider sx={{ my: 3 }}>or register with</Divider>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Mail />}
            onClick={() => handleOAuthRegister('Google')}
            disabled={isLoading}
          >
            Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Github />}
            onClick={() => handleOAuthRegister('GitHub')}
            disabled={isLoading}
          >
            GitHub
          </Button>
        </Box>

        <Typography variant="body2" align="center" color="text.secondary">
          Already have an account?{' '}
          <Link component={RouterLink} to="/login" color="primary">
            Sign in
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};