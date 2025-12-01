import React, { useState } from "react";
import "./warehousemappingdialog.css";
import { DataTable } from "../../components";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { getPartnerName, getPartners } from "../../utilities/utils";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  deleteWarehouseMapping,
  addWarehouseMapping,
} from "../../redux/reducers/warehouses/warehouses.thunks";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const CustomRemoveCircleIcon = styled(RemoveCircleIcon)({
  color: "#FF6969",
  fontSize: "24px",
});

const WarehouseMappingDialog = ({
  open,
  handleClose,
  rows,
  columns,
  options,
  warehouseId,
}) => {
  const [inputValues, setInputValues] = useState([]);
  const dispatch = useDispatch();
  const warehouse = useSelector((state) => state.warehouse);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newInputs = [...inputValues];
    newInputs[index][name] = value;
    setInputValues(newInputs);
  };

  const handleDialogClose = () => {
    setInputValues([]);
    handleClose();
  };

  const addInputFields = (e) => {
    e.preventDefault();
    setInputValues((prevState) => [
      ...prevState,
      {
        buyer_partner_id: "",
        seller_partner_id: "",
        trader_warehouse_id: "",
        seller_warehouse_id: "",
      },
    ]);
  };

  const handleRowClick = (val) => {};

  const handleActionClick = (action, rowData) => {
    if (action === "Delete") {
      const partner = getPartners().filter(
        (item) => item.partner_name === rowData["buyer_partner_id"]
      );
      const payload = {
        warehouse_id: warehouse.warehouseDetail.warehouse_id,
        buyer_partner_id: partner[0]["partner_id"],
      };
      dispatch(deleteWarehouseMapping(payload));
    }
  };

  const handleSubmit = () => {
    const payload = { warehouse_id: warehouseId, mappings: inputValues };
    setInputValues([]);
    dispatch(addWarehouseMapping(payload));
  };

  const updatedData = rows.map((item) => ({
    ...item,
    buyer_partner_id: getPartnerName(item.buyer_partner_id),
  }));

  const removeItem = (index) => {
    const newInp = inputValues.filter((item, ind) => ind !== index);
    setInputValues(newInp);
  };

  return (
    <BootstrapDialog
      onClose={handleDialogClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Warehouse Mappings
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
      <DialogContent dividers className="znect__whmap__dialog-content">
        <DataTable
          rows={updatedData}
          columns={columns}
          options={options}
          handleRowClick={(val) => {
            handleRowClick(val);
          }}
          onOptionClick={(option, rowData) => {
            handleActionClick(option, rowData);
          }}
        />
        {inputValues.map((item, index) => (
          <div key={index} className="znect__whmapping-dialog__control">
            <Select
              required
              name="buyer_partner_id"
              value={item.buyer_partner_id}
              onChange={(event) => handleChange(index, event)}
              sx={{ width: 180, height: 48 }}
            >
              {getPartners().map((partner, index) => (
                <MenuItem id={index} value={partner.partner_id}>
                  {partner.partner_name}
                </MenuItem>
              ))}
            </Select>
            <TextField
              required
              margin="dense"
              name="seller_partner_id"
              label="Seller ID"
              value={item.seller_partner_id}
              onChange={(event) => handleChange(index, event)}
              variant="outlined"
              sx={{
                mt: 0,
                mb: 0,
                "& .MuiInputBase-root": {
                  width: "140px",
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
            <TextField
              required
              margin="dense"
              name="trader_warehouse_id"
              label="Trader Warehouse ID"
              value={item.trader_warehouse_id}
              onChange={(event) => handleChange(index, event)}
              variant="outlined"
              sx={{
                mt: 0,
                mb: 0,
                "& .MuiInputBase-root": {
                  width: "178px",
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
            <TextField
              required
              margin="dense"
              name="seller_warehouse_id"
              label="Seller Warehouse ID"
              value={item.seller_warehouse_id}
              onChange={(event) => handleChange(index, event)}
              variant="outlined"
              sx={{
                mt: 0,
                mb: 0,
                "& .MuiInputBase-root": {
                  width: "178px",
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
            <button
              onClick={() => {
                removeItem(index);
              }}
            >
              <CustomRemoveCircleIcon />
            </button>
          </div>
        ))}
        <button
          style={{
            background: "#008DDA",
            alignSelf: "flex-end",
            marginTop: "10px",
            padding: "5px 10px",
            border: "none",
            borderRadius: "5px",
            color: "#fff",
          }}
          onClick={(e) => {
            addInputFields(e);
          }}
        >
          Add
        </button>
      </DialogContent>
      <DialogActions>
        {inputValues.length > 0 && (
          <Button autoFocus onClick={handleSubmit}>
            {warehouse.isLoading ? (
              <CircularProgress color="inherit" />
            ) : (
              "Save changes"
            )}
          </Button>
        )}
      </DialogActions>
    </BootstrapDialog>
  );
};

export default WarehouseMappingDialog;
