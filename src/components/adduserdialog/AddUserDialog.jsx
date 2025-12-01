import React, { useState } from "react";
import "./adduserdialog.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/reducers/users/users.thunks";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const AddUserDialog = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    designation: "",
    role: "",
  });
  const [userPermissions, setUserPermissions] = useState({
    order: false,
    inventory: false,
    products: false,
    warehouse: false,
    znectop: false,
  });
  const [error, setError] = useState("");
  const [permission, setPermission] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !input.name ||
      !input.username ||
      !input.password ||
      !input.designation ||
      !input.role
    ) {
      setError("Please fill in all fields.");
      return;
    }
    if (input.password !== input.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    const payload = {
      permissions: userPermissions,
      ...input,
    };
    dispatch(addUser(payload));
    setInput({
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
      designation: "",
      role: "",
    });
    handleClose();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "role" && value === "user") {
      setPermission(true);
    } else if (name === "role" && value === "admin") {
      setPermission(false);
    }
    const newInputs = { ...input };
    newInputs[name] = value;
    setInput(newInputs);
  };

  const handlePermissionChange = (event) => {
    setUserPermissions({
      ...userPermissions,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      open={open}
      maxWidth="sm"
      fullWidth={true}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ m: 0, p: 2 }}>Add User</DialogTitle>
        <IconButton
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
          <div className="znect__userdialog-container">
            <div className="znect__userdialog-content">
              <FormControl error={Boolean(error)}>
                <TextField
                  name="name"
                  label="Name"
                  value={input.name}
                  onChange={(event) => handleChange(event)}
                  variant="outlined"
                  required
                  size="small"
                  sx={{ width: 260 }}
                />
              </FormControl>
              <FormControl error={Boolean(error)}>
                <TextField
                  name="username"
                  label="Username"
                  value={input.username}
                  onChange={(event) => handleChange(event)}
                  variant="outlined"
                  required
                  size="small"
                  sx={{ width: 260 }}
                />
              </FormControl>
            </div>
            <div className="znect__userdialog-content">
              <FormControl error={Boolean(error)}>
                <TextField
                  name="password"
                  label="Password"
                  variant="outlined"
                  value={input.password}
                  onChange={(event) => handleChange(event)}
                  required
                  size="small"
                  type="password"
                  sx={{
                    width: "260px",
                    '& input[type="password"]': {
                      width: "100%",
                      height: "22px",
                    },
                  }}
                />
              </FormControl>
              <FormControl error={Boolean(error)}>
                <TextField
                  name="confirmPassword"
                  label="Confirm Password"
                  value={input.confirmPassword}
                  onChange={(event) => handleChange(event)}
                  variant="outlined"
                  required
                  size="small"
                  type="password"
                  sx={{
                    width: "260px",
                    '& input[type="password"]': {
                      width: "100%",
                      height: "22px",
                    },
                  }}
                />
                {error && <FormHelperText>{error}</FormHelperText>}
              </FormControl>
            </div>
            <div className="znect__userdialog-content">
              <p
                style={{
                  fontSize: "10px",
                  color: "red",
                  marginLeft: "10px",
                  fontFamily: "Poppins, Sans Serif",
                }}
              >
                Min length: 8, Use Caps, Numbers, and Alphanumeric character
              </p>
            </div>
            <div className="znect__userdialog-content">
              <FormControl error={Boolean(error)}>
                <TextField
                  name="designation"
                  label="Designation"
                  value={input.designation}
                  onChange={(event) => handleChange(event)}
                  variant="outlined"
                  required
                  size="small"
                  sx={{ width: 360 }}
                />
              </FormControl>
              <FormControl error={Boolean(error)}>
                <Select
                  required
                  name="role"
                  sx={{ width: 180, height: 42 }}
                  value={input.role}
                  onChange={(event) => handleChange(event)}
                >
                  {["admin", "user"].map((carrier, index) => (
                    <MenuItem id={index} value={carrier}>
                      {carrier}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            {permission && (
              <div className="znect__userdialog-content">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={userPermissions.order}
                      name="order"
                      onChange={handlePermissionChange}
                    />
                  }
                  label="Order"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={userPermissions.inventory}
                      name="inventory"
                      onChange={handlePermissionChange}
                    />
                  }
                  label="Inventory"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={userPermissions.products}
                      name="products"
                      onChange={handlePermissionChange}
                    />
                  }
                  label="Products"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={userPermissions.warehouse}
                      name="warehouse"
                      onChange={handlePermissionChange}
                    />
                  }
                  label="Warehouse"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={userPermissions.znectop}
                      name="znectop"
                      onChange={handlePermissionChange}
                    />
                  }
                  label="Znect Op"
                />
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button type="submit" autoFocus>
            Save changes
          </Button>
        </DialogActions>
      </form>
    </BootstrapDialog>
  );
};

export default AddUserDialog;
