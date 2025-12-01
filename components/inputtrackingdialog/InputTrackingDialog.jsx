import React, { useState, useEffect } from "react";
import "./inputtrackingdialog.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    maxHeight: "400px",
  },
}));

const InputTrackingDialog = ({ open, handleClose, handleSubmit, items }) => {
  const [trackingInfo, setTrackingInfo] = useState(
    items.map((it) => ({
      package_id: it.id,
      tracking_number: "",
      carrier: "",
      carrier_priority: "",
    }))
  );

  useEffect(() => {
    setTrackingInfo(
      items.map((it) => ({
        package_id: it.id,
        tracking_number: "",
        carrier: "",
        carrier_priority: "",
      }))
    );
  }, [items]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newInputs = [...trackingInfo];
    newInputs[index][name] = value;
    setTrackingInfo(newInputs);
  };

  const handleDialogClose = () => {
    setTrackingInfo(
      items.map(() => ({
        tracking_number: "",
        carrier: "",
        carrier_priority: "",
      }))
    );
    handleClose();
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Update Tracking Numbers
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleDialogClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        {trackingInfo.map((item, index) => (
          <div className="znect__tracking-pkg" key={index}>
            <div className="znect__tracking-pkg__header">
              <h5>Package {index + 1}</h5>
            </div>
            <div className="znect__tracking-pkg__content">
              <div className="znect__tracking-pkg__content-box">
                <p>SKUs: {items[index].sku}</p>
                <p>Qty: {items[index].quantity}</p>
                <p>
                  Dimensions:{" "}
                  {items[index].length ? items[index].length : "NaN"} x{" "}
                  {items[index].width ? items[index].width : "NaN"} x{" "}
                  {items[index].height ? items[index].height : "NaN"},{" "}
                  {items[index].weight ? items[index].weight : "NaN"} LBS
                </p>
              </div>
              <div className="znect__tracking-pkg__content-box">
                <TextField
                  required
                  margin="dense"
                  name="tracking_number"
                  label="Tracking No"
                  variant="outlined"
                  value={item.tracking_number}
                  onChange={(event) => handleChange(index, event)}
                  sx={{
                    mt: 0,
                    mb: 1,
                    "& .MuiInputBase-root": {
                      width: "200px",
                      height: "48px",
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "12px 14px",
                    },
                    "& .MuiTextField-root": {
                      width: "22ch",
                    },
                    "& .MuiInputLabel-outlined": {
                      transform: "translate(14px, 14px) scale(1)",
                    },
                    "& .MuiInputLabel-shrink": {
                      transform: "translate(14px, -6px) scale(0.75)",
                    },
                  }}
                />
                <Select
                  required
                  name="carrier"
                  value={item.carrier}
                  onChange={(event) => handleChange(index, event)}
                  sx={{ width: 200, height: 48, mb: 1 }}
                >
                  {["FEDEX", "UPS", "USPS", "LTL"].map((carrier, index) => (
                    <MenuItem id={index} value={carrier}>
                      {carrier}
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                  required
                  margin="dense"
                  name="carrier_priority"
                  label="Carrier Priority"
                  value={item.carrier_priority}
                  onChange={(event) => handleChange(index, event)}
                  variant="outlined"
                  sx={{
                    mt: 0,
                    mb: 0,
                    "& .MuiInputBase-root": {
                      width: "200px",
                      height: "48px",
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "12px 14px",
                    },
                    "& .MuiTextField-root": {
                      width: "22ch",
                    },
                    "& .MuiInputLabel-outlined": {
                      transform: "translate(14px, 14px) scale(1)",
                    },
                    "& .MuiInputLabel-shrink": {
                      transform: "translate(14px, -6px) scale(0.75)",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            handleSubmit(trackingInfo);
          }}
        >
          Save changes
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default InputTrackingDialog;
