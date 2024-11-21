import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { PostCard } from '../components/Post/PostCard';
import { Post } from '../types';

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    userId: '1',
    user: {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      bio: 'Dog trainer & behaviorist',
      pets: [],
      createdAt: '2024-02-15T10:00:00Z'
    },
    content: 'Top 3 tips for leash training your puppy:\n\n1. Start in a quiet area\n2. Use positive reinforcement\n3. Keep sessions short and fun!',
    images: ['https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=800'],
    likes: 42,
    comments: [],
    createdAt: '2024-02-15T10:00:00Z'
  },
  {
    id: '2',
    userId: '2',
    user: {
      id: '2',
      name: 'Mike Wilson',
      email: 'mike@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      bio: 'Professional dog trainer',
      pets: [],
      createdAt: '2024-02-14T15:30:00Z'
    },
    content: 'Remember: consistency is key in dog training. Your furry friend learns best through repetition and clear communication.',
    images: [],
    likes: 28,
    comments: [],
    createdAt: '2024-02-15T09:30:00Z'
  }
];

export const Home = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Latest Posts
        </Typography>
      </Box>
      
      {MOCK_POSTS.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Container>
  );
};