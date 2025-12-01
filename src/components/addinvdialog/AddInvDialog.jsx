import React, { useState } from "react";
import "./addinvdialog.css";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { TextField, Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch } from "react-redux";
import { addFullInventory } from "../../redux/reducers/inventorylist/inventorylist.thunks";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const CustomBlankIcon = styled(CancelIcon)({
  color: "#fff",
});

const CustomCancelIcon = styled(CancelIcon)({
  color: "#D22B2B",
});

const AddInvDialog = ({ open, handleClose }) => {
  const [sku, setSku] = useState("");
  const [error, setError] = useState("");
  const [inputFields, setInputFields] = useState([
    {
      warehouse_id: "",
      trader_id: "",
      seller_partner_id: "",
      quantity: "",
      backorder_quantity: "",
    },
  ]);
  const dispatch = useDispatch();

  const handleSkuChange = (event) => {
    setSku(event.target.value);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      {
        warehouse_id: "",
        trader_id: "",
        seller_partner_id: "",
        quantity: "",
        backorder_quantity: "",
      },
    ]);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  };

  const handleDialogClose = () => {
    setInputFields([
      {
        warehouse_id: "",
        trader_id: "",
        seller_partner_id: "",
        quantity: "",
        backorder_quantity: "",
      },
    ]);
    setSku("");
    handleClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!sku) {
      setError("Please fill in all fields.");
      return;
    }
    for (const item of inputFields) {
      if (
        !item.warehouse_id ||
        !item.trader_id ||
        !item.seller_partner_id ||
        !item.quantity ||
        !item.backorder_quantity
      ) {
        setError("Please fill in all fields.");
        return;
      }
    }
    setError("");
    const payload = {
      sku: sku,
      warehouses: inputFields,
    };
    dispatch(addFullInventory(payload));
    handleDialogClose();
  };

  return (
    <BootstrapDialog
      onClose={handleDialogClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="md"
      fullWidth={true}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Add Inventory
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
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <div className="znect__addinvdialog-container">
            <h3>Enter Inventory Informations</h3>

            <FormControl error={Boolean(error)}>
              <TextField
                name="sku"
                label="Trader SKU"
                value={sku}
                onChange={(event) => handleSkuChange(event)}
                variant="outlined"
                required
                size="small"
                sx={{ width: 250 }}
              />
            </FormControl>
            {inputFields.map((inputField, index) => (
              <div className="znect__addinvdialog-fields" key={index}>
                <FormControl error={Boolean(error)}>
                  <TextField
                    name="warehouse_id"
                    label="Warehouse ID"
                    value={inputField.warehouse_id}
                    onChange={(event) => handleInputChange(index, event)}
                    variant="outlined"
                    required
                    size="small"
                    sx={{ width: 150 }}
                  />
                </FormControl>

                <FormControl error={Boolean(error)}>
                  <TextField
                    name="trader_id"
                    label="Trader ID"
                    value={inputField.trader_id}
                    onChange={(event) => handleInputChange(index, event)}
                    variant="outlined"
                    required
                    size="small"
                    sx={{ width: 150 }}
                  />
                </FormControl>
                <FormControl error={Boolean(error)}>
                  <TextField
                    name="seller_partner_id"
                    label="Seller Partner ID"
                    value={inputField.seller_partner_id}
                    onChange={(event) => handleInputChange(index, event)}
                    variant="outlined"
                    required
                    size="small"
                    sx={{ width: 150 }}
                  />
                </FormControl>
                <FormControl error={Boolean(error)}>
                  <TextField
                    name="quantity"
                    label="Quantity"
                    value={inputField.quantity}
                    onChange={(event) => handleInputChange(index, event)}
                    variant="outlined"
                    required
                    size="small"
                    sx={{ width: 150 }}
                  />
                </FormControl>
                <FormControl error={Boolean(error)}>
                  <TextField
                    name="backorder_quantity"
                    label="Backorder Qty"
                    value={inputField.backorder_quantity}
                    onChange={(event) => handleInputChange(index, event)}
                    variant="outlined"
                    required
                    size="small"
                    sx={{ width: 150 }}
                  />
                </FormControl>
                {index !== 0 ? (
                  <CustomCancelIcon
                    onClick={() => {
                      handleRemoveFields(index);
                    }}
                  />
                ) : (
                  <CustomBlankIcon />
                )}
              </div>
            ))}
            <Button
              style={{ marginTop: 20 }}
              variant="contained"
              onClick={handleAddFields}
            >
              Add
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus type="submit">
            Save changes
          </Button>
        </DialogActions>
      </form>
    </BootstrapDialog>
  );
};

export default AddInvDialog;
