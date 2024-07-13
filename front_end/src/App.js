// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HourlyInput from "../src/pages/HourlyInput";
import AdHocInput from "../src/pages/AdHocInput";
import SummaryData from "../src/pages/SummaryData";
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
              to="/summary_data"
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
              Summary Data
            </Link>
          </Box>
          <Box>
            <Link
              to="/hourly_input"
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
              to="/adhoc_input"
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
          <Route path="/hourly_input" element={<HourlyInput />} />
          <Route path="/adhoc_input" element={<AdHocInput />} />
          <Route path="/summary_data" element={<SummaryData />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
