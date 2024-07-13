import React from 'react';
import { Box, Typography } from '@mui/material';


const PatientDetails = ({ patientFound, patientDetails }) => {
  if (patientFound === null) return null;

  return (
    <Box>
        <Box sx={{ padding: "10px 10px 0px 10px" }}>
          {/* Purple patient details box */}
          <Box
            sx={{
              padding: "10px",
              borderRadius: "3px",
              background: "#BEB9F6",
              maxWidth: { md: "20%", xs: "100%" },
              width: "max-content",
            }}
          >
            <Box sx={{ display: "flex", gap: "5px" }}>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "22.4px",
                  color: "black",
                  textAlign: "center",
                }}
              >
                Patient Name:
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "22.4px",
                  color: "black",
                  textAlign: "center",
                }}
              >
                {patientDetails.first_name} {patientDetails.last_name}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "5px" }}>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "22.4px",
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  Age:
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "22.4px",
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  {patientDetails.age}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "5px" }}>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "22.4px",
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  Height:
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "22.4px",
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  {patientDetails.height} cm
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "5px" }}>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "22.4px",
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  Weight:
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "22.4px",
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  {patientDetails.weight} kg
                </Typography>
              </Box>
              {/*
              <Box sx={{ display: "flex", gap: "5px" }}>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "22.4px",
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  Blood Type:
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "22.4px",
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  {patientDetails.blood_type}
                </Typography>
              </Box>
              */}
              <Box sx={{ display: "flex", gap: "5px" }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "22.4px",
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  Today’s Date:
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "22.4px",
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  {new Date().toLocaleDateString("en-GB")}
                </Typography>
              </Box>
          </Box>
        </Box>
    </Box>
  );
};
export default PatientDetails;
