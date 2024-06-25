// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HourlyInput from "../src/pages/HourlyInput";
import AdHocInput from "../src/pages/AdHocInput";
import { Box } from "@mui/material";

const App = () => {
  return (
    <Router>
      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            alignItems: "Center",
            padding: "20px",
          }}
        >
          <Box>
            <Link
              to="/summary"
              style={{
                textDecoration: "none",
                fontSize: { sm: "20px", xs: "14px" },
                fontWeight: 600,
                color: "#C0C0C0",
                pointerEvents: "none",
              }}
            >
              Summary
            </Link>
          </Box>
          <Box>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                fontSize: { sm: "20px", xs: "14px" },
                fontWeight: 600,
                color: "black",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
              onMouseOver={(e) => {
                e.target.style.color = "#FF6347"; // Change color on hover
                e.target.style.transform = "scale(1.1)"; // Slightly enlarge on hover
              }}
              onMouseOut={(e) => {
                e.target.style.color = "black"; // Revert color
                e.target.style.transform = "scale(1)"; // Revert size
              }}
            >
              Hourly Input
            </Link>
          </Box>
          <Box>
            <Link
              to="/adhoc"
              style={{
                textDecoration: "none",
                fontSize: { sm: "20px", xs: "14px" },
                fontWeight: 600,
                color: "black",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
              onMouseOver={(e) => {
                e.target.style.color = "#FF6347"; // Change color on hover
                e.target.style.transform = "scale(1.1)"; // Slightly enlarge on hover
              }}
              onMouseOut={(e) => {
                e.target.style.color = "black"; // Revert color
                e.target.style.transform = "scale(1)"; // Revert size
              }}
            >
              Ad-Hoc Input
            </Link>
          </Box>
        </Box>

        <Routes>
          <Route path="/" element={<HourlyInput />} />
          <Route path="/adhoc" element={<AdHocInput />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
