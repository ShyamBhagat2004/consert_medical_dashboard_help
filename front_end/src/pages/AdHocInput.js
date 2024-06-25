import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
} from "@mui/material";
import axios from 'axios';
import React, { useEffect, useState } from "react";

const AdHocInput = () => {
  const [inputMode, setInputMode] = useState("keyboard");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [formData, setFormData] = useState({
    temperature: "",
    bloodPressure: "",
    bloodOxygen: "",
    temperatureImage: null,
    bloodPressureImage: null,
    bloodOxygenImage: null,
    selectedHour: new Date().getHours(),
  });
  const [patientId, setPatientId] = useState("");
  const [patientFound, setPatientFound] = useState(null);
  const [patientDetails, setPatientDetails] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleHourChange = (e) => {
    setFormData({ ...formData, selectedHour: e.target.value });
  };

  const handlePatientIdChange = (e) => {
    setPatientId(e.target.value);
  };

  const handlePatientIdSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/patient_data/${patientId}`);
      console.log('Response status:', response.status); // Debugging statement
      setPatientDetails(response.data[0]);
      setPatientFound(true);
    } catch (err) {
      console.error('Error:', err); // Debugging statement
      setPatientFound(false);
      setPatientDetails({});
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <Container>
      <Box
        sx={{
          padding: "0px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { sm: "32px", xs: "24px" },
            lineHeight: "44.8px",
            color: "black",
            textAlign: "center",
          }}
        >
          Hourly Patient Vitals Data Input
        </Typography>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <TextField
            size="small"
            placeholder="Patient ID"
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
        {patientFound === true && (
          <Alert severity="success">Success! Details Populated</Alert>
        )}
        {patientFound === false && (
          <Alert severity="error">Error! Patient not Found</Alert>
        )}
        {patientFound === true && (
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
        )}
        <Box sx={{ padding: "10px" }}>
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
              Current Time:
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
              {formatTime(currentTime)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "10px", marginTop: "5px" }}>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "22.4px",
                color: "black",
                textAlign: "center",
              }}
            >
              Logging for hour:
            </Typography>
            <FormControl sx={{ width: 100 }}>
              <InputLabel sx={{ height: 25 }} labelId="selHour">
                Hour
              </InputLabel>
              <Select
                label="Hour"
                labelId="selHour"
                value={formData.selectedHour}
                onChange={handleHourChange}
                sx={{
                  height: 25,
                  "& .MuiSelect-select": {
                    height: 25,
                    minHeight: 25,
                    display: "flex",
                    alignItems: "center",
                  },
                }}
              >
                {Array.from({ length: 24 }).map((_, index) => (
                  <MenuItem key={index} value={index}>
                    {index}:00
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button
            onClick={() => setInputMode("keyboard")}
            sx={{
              background: inputMode == "keyboard" ? "#000000" : "#8A8686",
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
            sx={{
              background: inputMode == "stylus" ? "#000000" : "#8A8686",
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
            onClick={() => setInputMode("stylus")}
          >
            Stylus Input
          </Button>
        </Box>

        <Box
          sx={{
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: { md: "50%", xs: "100%" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "5px",
              alignItems: "Center",
              width: "100%",
              justifyContent: "space-between",
              flexWrap: { md: "nowrap", xs: "wrap" },
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
              1. Temperature (ºC):
            </Typography>
            {inputMode === "keyboard" ? (
              <TextField
                size="small"
                name="temperature"
                placeholder="Enter temperature"
                value={formData.temperature}
                onChange={handleInputChange}
                sx={{
                  "& .MuiInputBase-input": { height: 25, width: 200, padding: "0 14px" },
                }}
              />
            ) : (
              <input
                type="file"
                accept="image/*"
                name="temperatureImage"
                onChange={handleFileChange}
              />
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "5px",
              alignItems: "Center",
              width: "100%",
              justifyContent: "space-between",
              flexWrap: { md: "nowrap", xs: "wrap" },
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
              2. Blood Pressure (mmHg):
            </Typography>
            {inputMode === "keyboard" ? (
              <TextField
                size="small"
                name="bloodPressure"
                placeholder="Enter blood pressure level"
                value={formData.bloodPressure}
                onChange={handleInputChange}
                sx={{
                  "& .MuiInputBase-input": { height: 25, width: 200, padding: "0 14px" },
                }}
              />
            ) : (
              <input
                type="file"
                accept="image/*"
                name="bloodPressureImage"
                onChange={handleFileChange}
              />
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "5px",
              alignItems: "Center",
              width: "100%",
              justifyContent: "space-between",
              flexWrap: { md: "nowrap", xs: "wrap" },
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
              3. Blood Oxygen Level (mmHg):
            </Typography>
            {inputMode === "keyboard" ? (
              <TextField
                size="small"
                name="bloodOxygen"
                placeholder="Enter blood oxygen level"
                value={formData.bloodOxygen}
                onChange={handleInputChange}
                sx={{
                  "& .MuiInputBase-input": { height: 25, width: 200, padding: "0 14px" },
                }}
              />
            ) : (
              <input
                type="file"
                accept="image/*"
                name="bloodOxygenImage"
                onChange={handleFileChange}
              />
            )}
          </Box>
        </Box>
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
            onClick={() => {
              // handle form submission here
              console.log(formData);
            }}
          >
            Submit Vitals for Hour {formData.selectedHour}:00
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AdHocInput;
