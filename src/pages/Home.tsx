import React, { useState } from 'react';
import { Container, Typography, Box, Alert, Divider } from '@mui/material';
import { PostCard } from '../components/Post/PostCard';
import { SearchBar } from '../components/Search/SearchBar';
import { SearchFilters } from '../components/Search/SearchFilters';
import { useSearch } from '../hooks/useSearch';
import { useFilteredPosts } from '../hooks/useFilteredPosts';
import { MOCK_POSTS } from '../data/mockData';
import { FilterOptions } from '../types';

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    timeRange: 'all',
    sortBy: 'recent',
    tag: '',
  });

  // First apply search
  const searchResults = useSearch(MOCK_POSTS, searchQuery);
  
  // Then apply filters to search results
  const filteredPosts = useFilteredPosts(searchResults, filters);

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Latest Posts
        </Typography>
        
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery('')}
        />

        <SearchFilters 
          filters={filters}
          onFilterChange={setFilters}
        />

        <Divider sx={{ my: 2 }} />

        {(searchQuery || filters.tag) && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Found {filteredPosts.length} results
              {searchQuery && ` for "${searchQuery}"`}
              {filters.tag && ` in ${filters.tag}`}
            </Typography>
          </Box>
        )}

        {filteredPosts.length === 0 && (
          <Alert severity="info" sx={{ mb: 2 }}>
            No posts found matching your criteria. Try adjusting your filters or search terms.
          </Alert>
        )}
      </Box>
      
      {filteredPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Container>
  );
};