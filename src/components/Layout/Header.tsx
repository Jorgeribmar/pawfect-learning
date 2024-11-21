import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar } from '@mui/material';
import { Menu, PawPrint } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export const Header = () => {
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'white', color: 'primary.main' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <Menu />
        </IconButton>

        <PawPrint className="mr-2" />
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          PawfectLearning
        </Typography>

        {isAuthenticated ? (
          <>
            <Button component={Link} to="/create" color="primary" sx={{ mr: 2 }}>
              New Post
            </Button>
            <IconButton component={Link} to="/profile">
              <Avatar src={user?.avatar} alt={user?.name} />
            </IconButton>
          </>
        ) : (
          <>
            <Button component={Link} to="/login" color="inherit" sx={{ mr: 2 }}>
              Login
            </Button>
            <Button component={Link} to="/register" variant="contained" color="primary">
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};