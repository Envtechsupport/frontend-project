import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const SmallDatePicker = ({ selectedDate, onDateChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          "& .MuiInputBase-root": {
            height: "38px",
            borderRadius: "10px",
          },
          "& .MuiTextField-root": {
            m: 1,
            width: "22ch",
          },
        }}
      >
        <DatePicker
          value={selectedDate}
          onChange={(newValue) => {
            onDateChange(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small" // Use small size for TextField
              variant="outlined"
            />
          )}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default SmallDatePicker;
