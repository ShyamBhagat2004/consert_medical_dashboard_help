import {Alert, Box, Container, Typography} from "@mui/material";
import axios from 'axios';
import React, { useEffect, useState, useCallback } from "react";
import { Line } from 'react-chartjs-2';
import PatientSearch from '../components/PatientSearch';
import PatientDetails from '../components/PatientDetails';
import DateNavigator from '../components/DateNavigator';
import { Chart as ChartJS, TimeScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { format, subHours } from 'date-fns';
import {formatDateTime, sortDataByTime} from '../components/utils';

ChartJS.register(TimeScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const SummaryData = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [formData, setFormData] = useState({
    id: "",
  });
  const [chartData, setChartData] = useState(null);
  const [patientId, setPatientId] = useState(localStorage.getItem("submittedPatientId") || ""); 
  const [submittedPatientId, setSubmittedPatientId] = useState(localStorage.getItem("submittedPatientId") || ""); // This will be used for submitting
  const [patientFound, setPatientFound] = useState(null);
  const [patientDetails, setPatientDetails] = useState({});
  const [searchError, setSearchError] = useState("");
  const [selectedDate, setSelectedDate] = useState(localStorage.getItem("selectedDate") ? new Date(localStorage.getItem("selectedDate")) : new Date()); // State for the selected date
  const [selectedTime, setSelectedTime] = useState(localStorage.getItem("selectedTime") || "12:00"); // State for the selected time
  const [timeWindow, setTimeWindow] = useState(parseInt(localStorage.getItem("timeWindow")) || 12); // State for the time window

  const handlePatientIdChange = (e) => {
    setPatientId(e.target.value);
    setFormData({ ...formData, id: e.target.value });
  };

  const handlePatientIdSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/patient_data/${patientId}`);
      console.log('Response status:', response.status); // Debugging statement
      setPatientDetails(response.data[0]);
      setPatientFound(true);
      setSubmittedPatientId(patientId);
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
      setSubmittedPatientId(patientId);
    }
  };


  const fetchData = useCallback(async (date, time, window) => {

    const endDateTime = new Date(`${format(date, 'yyyy-MM-dd')}T${time}`);
    const startDateTime = subHours(endDateTime, window);

    const startTime = format(startDateTime, 'yyyy-MM-dd HH:mm:ss');
    const endTime = format(endDateTime, 'yyyy-MM-dd HH:mm:ss');

    try {
      const response = await axios.get(`http://localhost:8000/graph_data/${submittedPatientId}`, {
        params: { start_time: startTime, end_time: endTime }
      });
      const data = response.data;
      console.log(data)
      if (data.length === 0) {
        setChartData(null);
      } else {
        formatChartData(sortDataByTime(data));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setChartData(null);
    }
  }, [submittedPatientId]);

    const formatChartData = (data) => {
      const labels = data.map(item => item.datetime);
      const temperature_data = data.map(item => item.temperature);
      const bloodPressure_data = data.map(item => item.bloodPressure);
      const bloodOxygen_data = data.map(item => item.bloodOxygen);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Temperature (ºC)',
            data: temperature_data,
            borderColor: 'rgba(75,192,192,1)',
            fill: false,
          },
          {
            label: 'Blood Pressure (mmHg)',
            data: bloodPressure_data,
            borderColor: 'rgba(255,99,132,1)',
            fill: false,
          },
          {
            label: 'Blood Oxygen (SpO2)',
            data: bloodOxygen_data,
            borderColor: 'rgba(54,162,235,1)',
            fill: false,
          }
        ]
      });
    };

  useEffect(() => {
    fetchData(selectedDate, selectedTime, timeWindow);
  }, [fetchData, selectedDate, selectedTime, timeWindow, submittedPatientId])

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
      datetime: formatDateTime(currentTime)
    }));
  }, [currentTime]);

  // Update localStorage whenever patientId changes
  useEffect(() => {
    localStorage.setItem("patientId", patientId);
  }, [patientId]);

    // Update localStorage whenever submittedPatientId changes
  useEffect(() => {
    localStorage.setItem("submittedPatientId", submittedPatientId);
  }, [submittedPatientId]);

  // Update localStorage whenever selectedDate changes
  useEffect(() => {
    localStorage.setItem("selectedDate", selectedDate);
  }, [selectedDate]);


  useEffect(() => {
    localStorage.setItem("selectedTime", selectedTime);
  }, [selectedTime]);

  useEffect(() => {
    localStorage.setItem("timeWindow", timeWindow);
  }, [timeWindow]);

  // Automatically search for patient if patientId is in localStorage
  useEffect(() => {
    if (patientId) {
      handlePatientIdSearch();
    }     // eslint-disable-next-line
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <Container>
      <Box
        sx={{
          padding: "0px 10px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
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
          Summary Data
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
                <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: { sm: "24px", xs: "18px" },
                      lineHeight: "34.8px",
                      color: "black",
                      textAlign: "left",
                      marginTop: "10px" // Reduced margin at the top
                    }}
                  >
                    Patient Vitals Data Chart
                  </Typography>
                  
                  <DateNavigator 
                    selectedDate={selectedDate} 
                    setSelectedDate={setSelectedDate} 
                    selectedTime={selectedTime} 
                    setSelectedTime={setSelectedTime} 
                    timeWindow={timeWindow} 
                    setTimeWindow={setTimeWindow} 
                    patientId={submittedPatientId} 
                  />

                <div style={{ width: '100%', height: '100%', maxWidth: '45em', maxHeight: '30em' }}> {/* Adjust the width and height as needed */}
                  {chartData ? (
                    <Box sx={{ position: "relative", width: "100%", height: "0", paddingBottom: "56.25%" }}>
                      <Box sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
                        <Line
                          data={chartData}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                              x: {
                                type: 'time',
                                time: {
                                  unit: 'hour',
                                },
                                title: {
                                  display: true,
                                  text: 'Time',
                                },
                              },
                              y: {
                                title: {
                                  display: true,
                                  text: 'Value',
                                },
                              },
                            },
                          }}
                        />
                    </Box>
                  </Box>
                  ) : (
                    <Alert severity="error">Error! No data found for selected date.</Alert>
                  )}
                </div>
                
              </>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default SummaryData;