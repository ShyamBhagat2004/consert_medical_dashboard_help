import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

const VitalsInput = ({ formData, handleInputChange, handleInputFocus, errors, inputMode, handleFileChange, selectedCategory }) => {
  return (
    <Box
      sx={{
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: { md: "50%", xs: "100%" },
      }}
    >
      {selectedCategory === 'graph_data' && (
        <>
          {/* Temperature */}
          <InputField
            label="1. 🌡️ Temperature (ºC):"
            name="temperature"
            value={formData.temperature}
            handleChange={handleInputChange}
            handleFocus={handleInputFocus}
            error={errors.temperatureError}
            inputMode={inputMode}
            handleFileChange={handleFileChange}
          />

          {/* Blood Pressure */}
          <InputField
            label="2. 📈 Blood Pressure (mmHg):"
            name="bloodPressure"
            value={formData.bloodPressure}
            handleChange={handleInputChange}
            handleFocus={handleInputFocus}
            error={errors.bloodPressureError}
            inputMode={inputMode}
            handleFileChange={handleFileChange}
          />

          {/* Blood Oxygen */}
          <InputField
            label="3. 🫁 Blood Oxygen (SpO2):"
            name="bloodOxygen"
            value={formData.bloodOxygen}
            handleChange={handleInputChange}
            handleFocus={handleInputFocus}
            error={errors.bloodOxygenError}
            inputMode={inputMode}
            handleFileChange={handleFileChange}
          />
        </>
      )}
    </Box>
  );
};

const InputField = ({ label, name, value, handleChange, handleFocus, error, inputMode, handleFileChange }) => (
  <Box
    sx={{
      display: "flex",
      gap: "5px",
      alignItems: "Center",
      width: "100%",
      justifyContent: "space-between",
      flexWrap: { md: "nowrap", xs: "wrap" },
      position: 'relative'
    }}
  >
    <Typography
      sx={{
        fontWeight: 700,
        fontSize: "16px",
        lineHeight: "22.4px",
        color: "black",
        textAlign: "center",
      }}
    >
      {label}
    </Typography>
    {inputMode === "keyboard" ? (
      <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
        <TextField
          size="small"
          name={name}
          placeholder={`Enter digits only`}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          error={!!error}
          sx={{
            "& .MuiInputBase-input": { height: 25, width: 200, padding: "0 14px" },
          }}
        />
        {error && (
          <Typography
            sx={{
              color: 'red',
              fontSize: '14px',
              position: 'absolute',
              left: 'calc(100% + 10px)', // Position the error message to the right of the text box with some margin
              whiteSpace: 'nowrap',
            }}
          >
            {error}
          </Typography>
        )}
      </Box>
    ) : (
      <input
        type="file"
        accept="image/*"
        name={`${name}Image`}
        onChange={handleFileChange}
      />
    )}
  </Box>
);

export default VitalsInput;
