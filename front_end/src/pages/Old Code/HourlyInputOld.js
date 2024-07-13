import {
    Alert,
    Box,
    Button,
    Container,
    TextField,
    Typography,
  } from "@mui/material";
  import axios from 'axios';
  import React, { useEffect, useState } from "react";
  
  const HourlyInput = () => {
    const [inputMode, setInputMode] = useState("keyboard");
    const [temperatureError, setTemperatureError] = useState("");
    const [bloodPressureError, setBloodPressureError] = useState("");
    const [bloodOxygenError, setBloodOxygenError] = useState("");
    const [currentTime, setCurrentTime] = useState(new Date());
    const [submitError, setSubmitError] = useState(false);
    const [formData, setFormData] = useState({
      id: "",
      datetime: "",
      AN: "",
      Θ: "",
      ΑΠΣ: "",
      systolic_pressure: "",
      diastolic_pressure: "",
      temperature: "",
      bloodPressure: "",
      bloodOxygen: "",
      AN_image: null,
      Θ_image: null,
      ΑΠΣ_image: null,
      systolic_pressure_image: null,
      diastolic_pressure_image: null,
      temperatureImage: null,
      bloodPressureImage: null,
      bloodOxygenImage: null,
    });
  
    const [patientId, setPatientId] = useState("");
    const [patientFound, setPatientFound] = useState(null);
    const [patientDetails, setPatientDetails] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
  
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  
      // Validate the input
      if (name === "temperature") {
        if (!/^\d*\.?\d*$/.test(value)) {
          setTemperatureError("Invalid format.");
        } 
        else if (value === "") {
          setTemperatureError("Input cannot be empty.");
        } else {
          setTemperatureError("");
        }
      }
  
      if (name === "bloodPressure") {
        if (!/^\d*\.?\d*$/.test(value)) {
          setBloodPressureError("Invalid format.");
        } 
        else if (value === "") {
          setBloodPressureError("Input cannot be empty.");
        } else {
          setBloodPressureError("");
        }
      }
  
      if (name === "bloodOxygen") {
        if (!/^\d*\.?\d*$/.test(value)) {
          setBloodOxygenError("Invalid format.");
        } 
        else if (value === "") {
          setBloodOxygenError("Input cannot be empty.");
        } else {
          setBloodOxygenError("");
        }
      }
  
    };
  
    const handleInputFocus = (e) => {
      const { name, value } = e.target;
    
      if (name === "temperature" && value === "") {
        setTemperatureError("Input cannot be empty.");
      }
      if (name === "bloodPressure" && value === "") {
        setBloodPressureError("Input cannot be empty.");
      }
      if (name === "bloodOxygen" && value === "") {
        setBloodOxygenError("Input cannot be empty.");
      }
    };
  
    const handleFileChange = (e) => {
      const { name, files } = e.target;
      setFormData({ ...formData, [name]: files[0] });
    };
  
    const handlePatientIdChange = (e) => {
      setPatientId(e.target.value)
      formData.id = e.target.value;
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
  
    useEffect(() => {
      const formatDateTime = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:00:00`;
      };
  
      setFormData(prevFormData => ({
        ...prevFormData,
        datetime: formatDateTime(currentTime)
      }));
    }, [currentTime]);
  
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
            <Box sx={{ padding: "10px" }}>
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
              
              {/*Current date and hour being logged*/}
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
                    Logging for hour:
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
                    {new Date().getHours()}:00
                  </Typography>
                </Box>
              </Box>
  
              {/* Input mode select buttons*/}
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
                  sx={{
                    background: inputMode === "stylus" ? "#000000" : "#8A8686",
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
  
              {/* Data input */}
              <Box
                sx={{
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  width: { md: "50%", xs: "100%" },
                }}
              >
                {/* Temperature*/}
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
                    1. Temperature (ºC):
                  </Typography>
                  {inputMode === "keyboard" ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                      <TextField
                        size="small"
                        name="temperature"
                        placeholder="Enter temperature"
                        value={formData.temperature}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        error={!!temperatureError}
                        sx={{
                          "& .MuiInputBase-input": { height: 25, width: 200, padding: "0 14px" },
                        }}
                      />
                      {temperatureError && (
                        <Typography
                          sx={{
                            color: 'red',
                            fontSize: '14px',
                            position: 'absolute',
                            left: 'calc(100% + 10px)', // Position the error message to the right of the text box with some margin
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {temperatureError}
                        </Typography>
                      )}
                    </Box>
                  ) : (
                    <input
                      type="file"
                      accept="image/*"
                      name="temperatureImage"
                      onChange={handleFileChange}
                    />
                  )}
                  </Box>
  
                  {/* Blood Pressure */}
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
                    2. Blood Pressure (mmHg):
                  </Typography>
                  {inputMode === "keyboard" ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                      <TextField
                        size="small"
                        name="bloodPressure"
                        placeholder="Enter blood pressure"
                        value={formData.bloodPressure}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        error={!!bloodPressureError}
                        sx={{
                          "& .MuiInputBase-input": { height: 25, width: 200, padding: "0 14px" },
                        }}
                      />
                      {bloodPressureError && (
                        <Typography
                          sx={{
                            color: 'red',
                            fontSize: '14px',
                            position: 'absolute',
                            left: 'calc(100% + 10px)', // Position the error message to the right of the text box with some margin
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {bloodPressureError}
                        </Typography>
                      )}
                    </Box>
                  ) : (
                    <input
                      type="file"
                      accept="image/*"
                      name="bloodPressureImage"
                      onChange={handleFileChange}
                    />
                  )}
                  </Box>
  
                  {/* Blood Oxygen */}
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
                    3. Blood Oxygen (SpO2):
                  </Typography>
                  {inputMode === "keyboard" ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                      <TextField
                        size="small"
                        name="bloodOxygen"
                        placeholder="Enter blood oxygen"
                        value={formData.bloodOxygen}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        error={!!bloodOxygenError}
                        sx={{
                          "& .MuiInputBase-input": { height: 25, width: 200, padding: "0 14px" },
                        }}
                      />
                      {bloodOxygenError && (
                        <Typography
                          sx={{
                            color: 'red',
                            fontSize: '14px',
                            position: 'absolute',
                            left: 'calc(100% + 10px)', // Position the error message to the right of the text box with some margin
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {bloodOxygenError}
                        </Typography>
                      )}
                    </Box>
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
                  onClick={async() => {
                    // Validate all input fields
                    let hasError = false;
                
                    if (!formData.temperature) {
                      setTemperatureError("Input cannot be empty.");
                      hasError = true;
                    } else if (!/^\d*\.?\d*$/.test(formData.temperature)) {
                      setTemperatureError("Invalid format.");
                      hasError = true;
                    } else {
                      setTemperatureError("");
                    }
                
                    if (!formData.bloodPressure) {
                      setBloodPressureError("Input cannot be empty.");
                      hasError = true;
                    } else if (!/^\d*\.?\d*$/.test(formData.bloodPressure)) {
                      setBloodPressureError("Invalid format.");
                      hasError = true;
                    } else {
                      setBloodPressureError("");
                    }
                
                    if (!formData.bloodOxygen) {
                      setBloodOxygenError("Input cannot be empty.");
                      hasError = true;
                    } else if (!/^\d*\.?\d*$/.test(formData.bloodOxygen)) {
                      setBloodOxygenError("Invalid format.");
                      hasError = true;
                    } else {
                      setBloodOxygenError("");
                    }
                
                    // Prevent further code execution if there are errors
                    if (hasError) {
                      return;
                    }
                    // Prepare the data for submission
                    const data = {
                      id: patientId,
                      datetime: formData.datetime,
                      temperature: parseFloat(formData.temperature),
                      bloodPressure: parseFloat(formData.bloodPressure),
                      bloodOxygen: parseFloat(formData.bloodOxygen),
                    };
  
                    try {
                      // Send the POST request
                      const response = await axios.post('http://localhost:8000/graph_data', data);
                      setSuccessMessage("Data submitted successfully!");
                      setSubmitError(false);
                    } catch (error) {
                      if (error.response) {
                        setSuccessMessage(`Error! Status: ${error.response.status}`);
                      } else {
                        setSuccessMessage(`Error! Status: ${error.message}`);
                      }
                      setSubmitError(true);
                    }
                    }}
                >
                  Submit Vitals for Hour {new Date().getHours()}:00
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
            </Box>
          )}
        </Box>
      </Container>
    );
  };
  
  export default HourlyInput;
  