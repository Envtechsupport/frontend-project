import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AlertSnackBar = ({ open, msg, severity, handleAlertClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => handleAlertClose()}
    >
      <Alert
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
        onClose={() => handleAlertClose()}
      >
        {msg}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackBar;
