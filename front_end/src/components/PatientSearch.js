import React from 'react';
import { Box, TextField, Button } from '@mui/material';

const PatientSearch = ({ patientId, handlePatientIdChange, handlePatientIdSearch }) => {
  return (
    <Box sx={{ display: "flex", gap: "10px" }}>
      <TextField
        size="small"
        placeholder="Enter Numeric ID"
        label="Patient ID"
        value={patientId}
        onChange={handlePatientIdChange}
        sx={{
          "& .MuiInputBase-input": { height: 25, padding: "0 14px" },
        }}
      />
      <Button
        onClick={handlePatientIdSearch}
        sx={{
          background: "#ADEBAC",
          color: "black",
          height: "25px",
          fontSize: "12px",
          textTransform: "capitalize",
          "&:hover": {
            background: "#ADEBAC",
            color: "black",
          },
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default PatientSearch;
