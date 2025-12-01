import React, { useState } from "react";
import "./skumappingdialog.css";
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
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  addMappings,
  deleteMapping,
} from "../../redux/reducers/products/products.thunks";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

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

const SkuMappingDialog = ({
  open,
  handleClose,
  rows,
  columns,
  options,
  mainSku,
}) => {
  const [inputValues, setInputValues] = useState([]);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

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
      { partner_id: "", partner_sku: "" },
    ]);
  };

  const handleRowClick = (val) => {};

  const handleSubmit = () => {
    const payload = { sku: mainSku, mappings: inputValues };
    setInputValues([]);
    dispatch(addMappings(payload));
  };

  const removeItem = (index) => {
    const newInp = inputValues.filter((item, ind) => ind !== index);
    setInputValues(newInp);
  };

  const handleActionClick = (action, rowData) => {
    if (action === "Delete") {
      const partner = getPartners().filter(
        (item) => item.partner_name === rowData["partner_id"]
      );
      const payload = {
        sku: product.productDetail.sku,
        partner_id: partner[0]["partner_id"],
      };
      dispatch(deleteMapping(payload));
    }
  };

  const updatedData = rows.map((item) => ({
    partner_id: getPartnerName(item.partner_id),
    partner_sku: item.partner_sku,
  }));

  return (
    <BootstrapDialog
      onClose={handleDialogClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        SKU Mappings
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
      <DialogContent dividers className="znect__dialog-content">
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
          <div className="znect__mapping-dialog__control">
            <Select
              required
              name="partner_id"
              value={item.partner_id}
              label="Partner Name"
              onChange={(event) => handleChange(index, event)}
              sx={{ width: 140, height: 48 }}
            >
              {getPartners().map((partner, index) => (
                <MenuItem id={index} value={partner.partner_id}>
                  {partner.partner_name}
                </MenuItem>
              ))}
            </Select>
            <div className="dotted-line"></div>
            <TextField
              required
              margin="dense"
              name="partner_sku"
              label="Partner SKU"
              value={item.partner_sku}
              onChange={(event) => handleChange(index, event)}
              variant="outlined"
              sx={{
                mt: 0,
                mb: 0,
                "& .MuiInputBase-root": {
                  width: "240px",
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
            {product.isLoading ? (
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

export default SkuMappingDialog;
