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
} from '@mui/material';
import { Eye, EyeOff, Github, Mail } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { MOCK_USERS } from '../../data/mockData';

export const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = MOCK_USERS.find(u => u.email === formData.email);
      if (!user) {
        throw new Error('Invalid email or password');
      }

      login(user);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: string) => {
    setError('');
    setIsLoading(true);

    try {
      // Simulate OAuth API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = MOCK_USERS[0];
      login(mockUser);
      navigate('/');
    } catch (err) {
      setError(`${provider} login failed`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 12 }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Welcome Back
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Sign in to continue to PawfectLearning
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
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
            autoComplete="current-password"
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            Sign In
          </Button>
        </Box>

        <Divider sx={{ my: 3 }}>or continue with</Divider>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Mail />}
            onClick={() => handleOAuthLogin('Google')}
            disabled={isLoading}
          >
            Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Github />}
            onClick={() => handleOAuthLogin('GitHub')}
            disabled={isLoading}
          >
            GitHub
          </Button>
        </Box>

        <Typography variant="body2" align="center" color="text.secondary">
          Don't have an account?{' '}
          <Link component={RouterLink} to="/register" color="primary">
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};