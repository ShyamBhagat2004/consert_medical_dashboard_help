import {Alert, Box, Container, Typography,  FormControl,
  InputLabel, Select, MenuItem} from "@mui/material";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import PatientSearch from '../components/PatientSearch';
import PatientDetails from '../components/PatientDetails';
import VitalsInput from '../components/VitalsInput';
import SubmitButton from '../components/SubmitButton';
import InputModeToggle from '../components/InputModeToggle';
import { validateInput, formatTime, formatAHDateTime } from '../components/utils';

const AdHocInput = () => {
const [inputMode, setInputMode] = useState("keyboard");
const [temperatureError, setTemperatureError] = useState("");
const [bloodPressureError, setBloodPressureError] = useState("");
const [bloodOxygenError, setBloodOxygenError] = useState("");
const [currentTime, setCurrentTime] = useState(new Date());
const [submitError, setSubmitError] = useState(false);
const [formData, setFormData] = useState({
  id: "",
  datetime: "",
  temperature: "",
  bloodPressure: "",
  bloodOxygen: "",
  temperatureImage: null,
  bloodPressureImage: null,
  bloodOxygenImage: null,
  selectedHour: new Date().getHours(),
});

const [patientId, setPatientId] = useState(localStorage.getItem("patientId") || ""); 
const [patientFound, setPatientFound] = useState(null);
const [patientDetails, setPatientDetails] = useState({});
const [successMessage, setSuccessMessage] = useState("");
const [searchError, setSearchError] = useState("");


const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });

  let errorMessage = validateInput(value);
  if (name === "temperature") setTemperatureError(errorMessage);
  if (name === "bloodPressure") setBloodPressureError(errorMessage);
  if (name === "bloodOxygen") setBloodOxygenError(errorMessage);
};

const handleInputFocus = (e) => {
  const { name, value } = e.target;
  if (name === "temperature" && value === "") setTemperatureError("Input cannot be empty.");
  if (name === "bloodPressure" && value === "") setBloodPressureError("Input cannot be empty.");
  if (name === "bloodOxygen" && value === "") setBloodOxygenError("Input cannot be empty.");
};

const handleFileChange = (e) => {
  const { name, files } = e.target;
  setFormData({ ...formData, [name]: files[0] });
};

const handlePatientIdChange = (e) => {
  setPatientId(e.target.value);
  setFormData({ ...formData, id: e.target.value });
};

const handleHourChange = (e) => {
  setFormData({ ...formData, selectedHour: e.target.value });
};

const handlePatientIdSearch = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/patient_data/${patientId}`);
    console.log('Response status:', response.status); // Debugging statement
    setPatientDetails(response.data[0]);
    setPatientFound(true);
  } catch (err) {
    setSearchError(err.message);
    if(err.response.status === 404)
      setSearchError(err.message.concat(" (Patient ID not found)"))
    if(err.response.status === 422)
      setSearchError(err.message.concat(" (Input ID of wrong type, not an integer)."))
    if(err.response.status === 405)
      setSearchError(err.message.concat(" (No value for ID inputted)."))


    setPatientFound(false);
    setPatientDetails({});
  }
};

// Incrementing current time on screen second-by-second
useEffect(() => {
  const timer = setInterval(() => {
    setCurrentTime(new Date());
  }, 1000);
  return () => clearInterval(timer);
}, []);

// Storing live time in required format
useEffect(() => {
  setFormData(prevFormData => ({
    ...prevFormData,
    datetime: formatAHDateTime(currentTime, formData.selectedHour)
  }));
}, [currentTime, formData.selectedHour]);

// Update localStorage whenever patientId changes
useEffect(() => {
  localStorage.setItem("patientId", patientId);
}, [patientId]);

// Automatically search for patient if patientId is in localStorage
useEffect(() => {
  if (patientId) {
    handlePatientIdSearch();
  }     // eslint-disable-next-line
}, []); // Empty dependency array ensures this runs only once on mount

const handleSubmit = async () => {
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

  if(hasError === false)
  {
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
      console.log(response.status)
    } catch (error) {
      if (error.response) {
        setSuccessMessage(`Error! Status: ${error.response.status}`);
      } else {
        setSuccessMessage(`Error! Status: ${error.message}`);
      }
      setSubmitError(true);
    }      
  }
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
          textAlign: "left",
        }}
      >
        AdHoc Patient Vitals Data Input
      </Typography>
      
      <PatientSearch
        patientId={patientId}
        handlePatientIdChange={handlePatientIdChange}
        handlePatientIdSearch={handlePatientIdSearch}
      />

      {patientFound === false && (
        <Alert severity="error">Error! {searchError}</Alert>
      )}

      {patientFound === true && (
        <>
          <Alert severity="success">Success! Details Populated</Alert>
          
          <PatientDetails patientFound={patientFound} patientDetails={patientDetails} />
          
          {patientFound && (
            <>
              <Box sx={{padding: "0px 20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0px",}}>
                {/* Current date and hour being logged */}
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
                              {index.toString().padStart(2,'0')}:00
                          </MenuItem>
                          ))}
                      </Select>
                      </FormControl>
                  </Box>
              </Box>

              <InputModeToggle inputMode={inputMode} setInputMode={setInputMode} />

              <VitalsInput
                formData={formData}
                handleInputChange={handleInputChange}
                handleInputFocus={handleInputFocus}
                errors={{ temperatureError, bloodPressureError, bloodOxygenError }}
                inputMode={inputMode}
                handleFileChange={handleFileChange}
              />

              <SubmitButton
                handleSubmit={handleSubmit}
                successMessage={successMessage}
                submitError={submitError}
                selectedHour={formData.selectedHour}
              />
            </>
          )}
        </>
      )}
    </Box>
  </Container>
);
};

export default AdHocInput;