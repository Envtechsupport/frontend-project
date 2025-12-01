import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const AlertDialog = ({ title, body, open, handleAction, singleInput }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={() => {
        handleAction(false);
      }}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{body}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {singleInput ? (
          <Button
            autoFocus
            onClick={() => {
              handleAction(false);
            }}
          >
            Ok
          </Button>
        ) : (
          <>
            <Button
              autoFocus
              onClick={() => {
                handleAction(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleAction(true);
              }}
              autoFocus
            >
              Proceed
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
