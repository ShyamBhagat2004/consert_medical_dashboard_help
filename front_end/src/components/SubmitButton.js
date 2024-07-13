import React from 'react';
import { Button, Typography, Box } from '@mui/material';

const SubmitButton = ({ handleSubmit, successMessage, submitError, selectedHour}) => {
  return (
    <Box>
      <Button
        sx={{
          background: "#ADEBAC",
          color: "black",
          "&:hover": {
            background: "#ADEBAC",
            color: "black",
          },
        }}
        onClick={handleSubmit}
      >
        Submit Vitals for Hour {selectedHour.toString().padStart(2,'0')}:00
      </Button>
      {successMessage && (
        <Typography
          sx={{
            color: submitError ? 'red' : 'green',
            fontSize: '14px',
            marginLeft: '10px',
            display: 'inline-block',
          }}
        >
          {successMessage}
        </Typography>
      )}
    </Box>
  );
};

export default SubmitButton;
