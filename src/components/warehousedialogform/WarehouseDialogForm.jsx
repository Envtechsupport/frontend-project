import React, { useState, useEffect } from "react";
import "./warehousedialogform.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const WarehouseDialogForm = ({
  open,
  warehouseDetails,
  handleClose,
  onDataSubmit,
  clear,
}) => {
  const [formInput, setFormInput] = useState(warehouseDetails);

  const handleInputChange = (event) => {
    setFormInput((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    if (clear == true || (clear == false && clear !== null)) {
      setFormInput(warehouseDetails);
    }
  }, [clear]);

  return (
    <BootstrapDialog
      onClose={() => {
        handleClose();
      }}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="md"
      fullWidth={true}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          handleClose();
          onDataSubmit(formJson);
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Warehouse Details
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => {
          handleClose();
        }}
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
        <div className="znect__warehouse-dialog__container">
          <TextField
            required
            margin="dense"
            id="warehouse_id"
            name="warehouse_id"
            label="Warehouse ID"
            value={formInput["warehouse_id"]}
            onChange={(event) => handleInputChange(event)}
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                width: "148px",
              },
              "& .MuiTextField-root": {
                m: 1,
                width: "22ch",
              },
            }}
          />
          <TextField
            required
            margin="dense"
            id="name"
            name="name"
            label="Warehouse Name"
            value={formInput["name"]}
            onChange={(event) => handleInputChange(event)}
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                width: "248px",
              },
              "& .MuiTextField-root": {
                m: 1,
                width: "22ch",
              },
            }}
          />
          <TextField
            margin="dense"
            id="seller_partner_id"
            name="seller_partner_id"
            label="Seller ID"
            value={formInput["seller_partner_id"]}
            onChange={(event) => handleInputChange(event)}
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                width: "148px",
              },
              "& .MuiTextField-root": {
                m: 1,
                width: "22ch",
              },
            }}
          />
          <TextField
            margin="dense"
            id="phone_number"
            name="phone_number"
            label="Phone Number"
            value={formInput["phone_number"]}
            onChange={(event) => handleInputChange(event)}
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                width: "248px",
              },
              "& .MuiTextField-root": {
                m: 1,
                width: "22ch",
              },
            }}
          />
        </div>
        <div className="znect__warehouse-dialog__container">
          <TextField
            margin="dense"
            id="street1"
            name="street1"
            label="Street Address"
            value={formInput["street1"]}
            onChange={(event) => handleInputChange(event)}
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                width: "248px",
              },
              "& .MuiTextField-root": {
                m: 1,
                width: "22ch",
              },
            }}
          />
          <TextField
            margin="dense"
            id="city"
            name="city"
            label="City"
            value={formInput["city"]}
            onChange={(event) => handleInputChange(event)}
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                width: "248px",
              },
              "& .MuiTextField-root": {
                m: 1,
                width: "22ch",
              },
            }}
          />
          <TextField
            margin="dense"
            id="state"
            name="state"
            label="State"
            value={formInput["state"]}
            onChange={(event) => handleInputChange(event)}
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                width: "140px",
              },
              "& .MuiTextField-root": {
                m: 1,
                width: "22ch",
              },
            }}
          />
          <TextField
            margin="dense"
            id="country"
            name="country"
            label="Country"
            value={formInput["country"]}
            onChange={(event) => handleInputChange(event)}
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                width: "100px",
              },
              "& .MuiTextField-root": {
                m: 1,
                width: "22ch",
              },
            }}
          />
        </div>
        <div className="znect__warehouse-dialog__container">
          <TextField
            margin="dense"
            id="zip"
            name="zip"
            label="Zipcode"
            value={formInput["zip"]}
            onChange={(event) => handleInputChange(event)}
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                width: "148px",
              },
              "& .MuiTextField-root": {
                m: 1,
                width: "22ch",
              },
            }}
          />
          <TextField
            margin="dense"
            id="cut_off"
            name="cut_off"
            label="Cutoff Time (hh/mm)"
            value={formInput["cut_off"]}
            onChange={(event) => handleInputChange(event)}
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                width: "248px",
              },
              "& .MuiTextField-root": {
                m: 1,
                width: "22ch",
              },
            }}
          />
          <TextField
            margin="dense"
            id="add_odoo"
            name="add_odoo"
            label="Add to Odoo (yes/no)"
            value={formInput["add_odoo"]}
            onChange={(event) => handleInputChange(event)}
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                width: "248px",
              },
              "& .MuiTextField-root": {
                m: 1,
                width: "22ch",
              },
            }}
          />
          <TextField
            margin="dense"
            id="pickup_day"
            name="pickup_day"
            label="Pickup Day"
            value={formInput["pickup_day"]}
            onChange={(event) => handleInputChange(event)}
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                width: "148px",
              },
              "& .MuiTextField-root": {
                m: 1,
                width: "22ch",
              },
            }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus type="submit">
          Save changes
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default WarehouseDialogForm;
