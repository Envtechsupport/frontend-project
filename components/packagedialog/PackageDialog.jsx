import React, { useState } from "react";
import PropTypes from "prop-types";
import "./packagedialog.css";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { PackageInput } from "../../components";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const PackageDialog = ({ open, handleClose, handleSubmit, items }) => {
  const [dimensions, setDimensions] = useState({
    length: "",
    width: "",
    height: "",
    weight: "",
  });
  const [pkgInput, setPkgInput] = useState([]);
  const [isLtl, setIsLtl] = useState(false);

  const handleChangeInputChange = (event, field) => {
    const { value } = event.target;
    setDimensions((prevDimensions) => ({
      ...prevDimensions,
      [field]: value,
    }));
  };

  const handleLTLChange = (event) => {
    setIsLtl(event.target.checked);
  };

  const handlePackageInputChange = (newInputs) => {
    setPkgInput(newInputs);
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Package Info
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
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
        <div className="znect__pkgdialog-container">
          <PackageInput
            getInputs={handlePackageInputChange}
            items={items}
            setDimensions={setDimensions}
          />
          <div className="znect__pkgdialog-container__dim">
            {["length", "width", "height", "weight"].map((field) => (
              <div key={field}>
                <p>Shipping {field.charAt(0).toUpperCase() + field.slice(1)}</p>
                <TextField
                  name={field}
                  value={dimensions[field]}
                  onChange={(event) => handleChangeInputChange(event, field)}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {field === "weight" ? "LBS" : "IN"}
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "40px",
                      width: "100px",
                    },
                  }}
                />
              </div>
            ))}
          </div>
          <div className="znect__pkgdialog-container__switch">
            <FormControlLabel
              required
              control={<Switch checked={isLtl} onChange={handleLTLChange} />}
              label="LTL"
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            handleSubmit({ dimensions, pkgInput, isLtl });
          }}
        >
          Save changes
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

PackageDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};

export default PackageDialog;