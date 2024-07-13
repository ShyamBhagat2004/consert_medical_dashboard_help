import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, TextField, Badge, MenuItem, Select, IconButton } from "@mui/material";
import { DatePicker, LocalizationProvider, PickersDay, CalendarPickerSkeleton } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addDays, subDays, getDaysInMonth, format } from 'date-fns';
import axios from 'axios';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const DateNavigator = ({ selectedDate, setSelectedDate, selectedTime, setSelectedTime, timeWindow, setTimeWindow, patientId }) => {
  const requestAbortController = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([]);

  const fetchHighlightedDays = useCallback(async (date) => {
    const controller = new AbortController();
    const daysInMonth = getDaysInMonth(date);
    const daysToHighlight = [];

    setIsLoading(true);
    setHighlightedDays([]);

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
      const formattedDate = format(currentDate, 'yyyy-MM-dd');
      const startTime = `${formattedDate} 00:00:00`;
      const endTime = `${formattedDate} 23:59:59`;

      try {
        await axios.get(`http://localhost:8000/graph_data/${patientId}`, {
          params: { start_time: startTime, end_time: endTime, _: new Date().getTime() },
          signal: controller.signal,
        });
        daysToHighlight.push({ day, success: true });
      } catch (error) {
        if (error.name !== 'AbortError') {
          daysToHighlight.push({ day, success: false });
        }
      }
    }

    setHighlightedDays(daysToHighlight);
    setIsLoading(false);
    requestAbortController.current = controller;
  }, [patientId]);

  useEffect(() => {
    fetchHighlightedDays(new Date());
    return () => requestAbortController.current?.abort();
  }, [fetchHighlightedDays, patientId]);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    fetchHighlightedDays(date);
  };

  const handleOpen = () => {
    fetchHighlightedDays(new Date(selectedDate));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "0px",
        }}
      >
        <IconButton
          onClick={() => setSelectedDate(subDays(selectedDate, 1))}
          sx={{ minWidth: "20px", padding: 0 }}
        >
          <ArrowLeftIcon />
        </IconButton>
        <DatePicker
          label="Select Date"
          value={selectedDate}
          onChange={(newValue) => {
            setSelectedDate(newValue);
          }}
          inputFormat="dd/MM/yyyy"
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                width: "200px"
              }}
            />
          )}
          maxDate={new Date()}
          loading={isLoading}
          onMonthChange={handleMonthChange}
          onOpen={handleOpen}
          renderLoading={() => <CalendarPickerSkeleton />}
          renderDay={(day, _value, DayComponentProps) => {
            const isSelected =
              !DayComponentProps.outsideCurrentMonth &&
              highlightedDays.some(highlight => highlight.day === day.getDate() && highlight.success);

            const isUnavailable =
              !DayComponentProps.outsideCurrentMonth &&
              highlightedDays.some(highlight => highlight.day === day.getDate() && !highlight.success);

            return (
              <Badge
                key={day.toString()}
                overlap="circular"
                badgeContent={isSelected ? '✓' : isUnavailable ? '✗' : undefined}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: isSelected ? 'lightgreen' : isUnavailable ? 'lightcoral' : 'inherit',
                    color: isSelected || isUnavailable ? 'black' : 'inherit'
                  }
                }}
              >
                <PickersDay {...DayComponentProps} />
              </Badge>
            );
          }}
        />
        <IconButton
          onClick={() => setSelectedDate(addDays(selectedDate, 1))}
          disabled={selectedDate >= new Date()}
          sx={{ minWidth: "30px", padding: 0 }}
        >
          <ArrowRightIcon />
        </IconButton>
        <TextField
          label="Select End Time"
          type="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
          sx={{ width: 150 }}
        />
        <Select
          //label="Select Date"
          value={timeWindow}
          onChange={(e) => setTimeWindow(e.target.value)}
          sx={{ width: 150}}
        >
          <MenuItem value={3}>Last 3 hours</MenuItem>
          <MenuItem value={6}>Last 6 hours</MenuItem>
          <MenuItem value={12}>Last 12 hours</MenuItem>
          <MenuItem value={24}>Last 24 hours</MenuItem>
        </Select>
      </Box>
    </LocalizationProvider>
  );
};

export default DateNavigator;
