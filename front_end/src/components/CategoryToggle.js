import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const CategoryToggle = ({ selectedCategory, setSelectedCategory }) => {
  const categories = ['graph_data', 'heart_data']; // Add more categories as needed

  const handlePreviousCategory = () => {
    const currentIndex = categories.indexOf(selectedCategory);
    const newIndex = (currentIndex === 0) ? categories.length - 1 : currentIndex - 1;
    setSelectedCategory(categories[newIndex]);
  };

  const handleNextCategory = () => {
    const currentIndex = categories.indexOf(selectedCategory);
    const newIndex = (currentIndex === categories.length - 1) ? 0 : currentIndex + 1;
    setSelectedCategory(categories[newIndex]);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <IconButton onClick={handlePreviousCategory}>
        <ArrowLeftIcon />
      </IconButton>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: '16px',
          lineHeight: '22.4px',
          color: 'black',
          textAlign: 'center',
        }}
      >
        {selectedCategory.replace('_', ' ').toUpperCase()}
      </Typography>
      <IconButton onClick={handleNextCategory}>
        <ArrowRightIcon />
      </IconButton>
    </Box>
  );
};

export default CategoryToggle;
