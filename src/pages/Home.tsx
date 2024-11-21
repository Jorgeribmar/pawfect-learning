import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { PostCard } from '../components/Post/PostCard';
import { MOCK_POSTS } from '../data/mockData';

export const Home = () => {
  // Sort posts by date, newest first
  const sortedPosts = [...MOCK_POSTS].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Latest Posts
        </Typography>
      </Box>
      
      {sortedPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Container>
  );
};