import React from 'react';
import { Box, Button } from '@mui/material';

const InputModeToggle = ({ inputMode, setInputMode }) => {
  return (
    <Box sx={{ display: "flex", gap: "10px" }}>
      <Button
        onClick={() => setInputMode("keyboard")}
        sx={{
          background: inputMode === "keyboard" ? "#000000" : "#8A8686",
          borderRadius: "8px",
          color: "#fff",
          height: "29px",
          fontWeight: 500,
          fontSize: { sm: "14px", xs: "12px" },
          lineHeight: "24px",
          padding: "14px 24px",
          whiteSpace: "nowrap",
          cursor: "pointer",
          "&:hover": {
            background: "#000000",
            color: "#fff",
          },
        }}
      >
        Keyboard Input
      </Button>
      <Button
        onClick={() => setInputMode("file")}
        sx={{
          background: inputMode === "file" ? "#000000" : "#8A8686",
          borderRadius: "8px",
          color: "#fff",
          height: "29px",
          fontWeight: 500,
          fontSize: { sm: "14px", xs: "12px" },
          lineHeight: "24px",
          padding: "14px 24px",
          whiteSpace: "nowrap",
          cursor: "pointer",
          "&:hover": {
            background: "#000000",
            color: "#fff",
          },
        }}
      >
        File Input
      </Button>
    </Box>
  );
};

export default InputModeToggle;
