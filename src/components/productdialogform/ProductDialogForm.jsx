import React, { useState, useEffect } from "react";
import "./productdialogform.css";
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
import { InputLabel, FormControl } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ProductDialogForm = ({
  open,
  productDetails,
  handleClose,
  onDataSubmit,
  clear,
}) => {
  const [formInput, setFormInput] = useState({
    ...productDetails,
    add_to_odoo: productDetails.add_to_odoo || "No",
    odoo_category: productDetails.odoo_category || "",
  });

  const handleInputChange = (event) => {
    setFormInput((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    if (clear === true || (clear === false && clear !== null)) {
      setFormInput(productDetails);
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
          onDataSubmit({ ...formJson, is_active: "YES" });
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Product Details
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
        <div className="znect__product-dialog__container">
          <TextField
            required
            margin="dense"
            id="sku"
            name="sku"
            label="Product SKU"
            value={formInput["sku"]}
            onChange={(event) => handleInputChange(event)}
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                width: "348px",
              },
              "& .MuiTextField-root": {
                m: 1,
                width: "22ch",
              },
            }}
          />
          <TextField
            margin="dense"
            id="upc"
            name="upc"
            label="Product UPC"
            value={formInput["upc"]}
            onChange={(event) => handleInputChange(event)}
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                width: "348px",
              },
              "& .MuiTextField-root": {
                m: 1,
                width: "22ch",
              },
            }}
          />
          <TextField
            margin="dense"
            id="price"
            name="price"
            label="Price"
            value={formInput["price"]}
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
        <div className="znect__product-dialog__container">
          <TextField
            margin="dense"
            id="name"
            name="name"
            value={formInput["name"]}
            onChange={(event) => handleInputChange(event)}
            label="Product Name"
            variant="outlined"
            multiline
            rows={3}
            sx={{
              "& .MuiInputBase-root": {
                width: "348px",
              },
              "& .MuiTextField-root": {
                m: 1,
                width: "22ch",
              },
            }}
          />
          <TextField
            margin="dense"
            id="manufacturer"
            name="manufacturer"
            value={formInput["manufacturer"]}
            onChange={(event) => handleInputChange(event)}
            label="Manufacturer"
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                width: "300px",
              },
              "& .MuiTextField-root": {
                m: 1,
                width: "22ch",
              },
            }}
          />
          <FormControl sx={{ width: 150 }}>
            <InputLabel id="shiptype-label">Ship Type</InputLabel>
            <Select
              required
              id="shiptype"
              labelId="shiptype-label"
              name="ship_type"
              value={formInput["ship_type"]}
              onChange={(event) => handleInputChange(event)}
            >
              {["LTL Freight", "Small Parcel"].map((val, index) => (
                <MenuItem key={index} value={val}>
                  {val}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="znect__product-dialog__container">
          <TextField
            margin="dense"
            id="productlength"
            name="length"
            value={formInput["length"]}
            onChange={(event) => handleInputChange(event)}
            label="Product Length"
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                width: "200px",
              },
              "& .MuiTextField-root": {
                m: 1,
                width: "22ch",
              },
            }}
          />
          <TextField
            margin="dense"
            id="productwidth"
            name="width"
            label="Product Width"
            value={formInput["width"]}
            onChange={(event) => handleInputChange(event)}
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                width: "200px",
              },
              "& .MuiTextField-root": {
                m: 1,
                width: "22ch",
              },
            }}
          />
          <TextField
            margin="dense"
            id="productheight"
            name="height"
            value={formInput["height"]}
            onChange={(event) => handleInputChange(event)}
            label="Product Height"
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                width: "200px",
              },
              "& .MuiTextField-root": {
                m: 1,
                width: "22ch",
              },
            }}
          />
          <TextField
            margin="dense"
            id="productweight"
            name="weight"
            value={formInput["weight"]}
            onChange={(event) => handleInputChange(event)}
            label="Product Weight"
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                width: "200px",
              },
              "& .MuiTextField-root": {
                m: 1,
                width: "22ch",
              },
            }}
          />
        </div>
        <div className="znect__product-dialog__container">
          <TextField
            margin="dense"
            id="shippinglength"
            name="shipping_length"
            value={formInput["shipping_length"]}
            onChange={(event) => handleInputChange(event)}
            label="Shipping Length"
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                width: "200px",
              },
              "& .MuiTextField-root": {
                m: 1,
                width: "22ch",
              },
            }}
          />
          <TextField
            margin="dense"
            id="shippingwidth"
            name="shipping_width"
            value={formInput["shipping_width"]}
            onChange={(event) => handleInputChange(event)}
            label="Shipping Width"
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                width: "200px",
              },
              "& .MuiTextField-root": {
                m: 1,
                width: "22ch",
              },
            }}
          />
          <TextField
            margin="dense"
            id="shippingheight"
            name="shipping_height"
            value={formInput["shipping_height"]}
            onChange={(event) => handleInputChange(event)}
            label="Shipping Height"
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                width: "200px",
              },
              "& .MuiTextField-root": {
                m: 1,
                width: "22ch",
              },
            }}
          />
          <TextField
            margin="dense"
            id="shippingweight"
            name="shipping_weight"
            value={formInput["shipping_weight"]}
            onChange={(event) => handleInputChange(event)}
            label="Shipping Weight"
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                width: "200px",
              },
              "& .MuiTextField-root": {
                m: 1,
                width: "22ch",
              },
            }}
          />
        </div>
        <div className="znect__product-dialog__container">
          <FormControl sx={{ width: 180 }}>
            <InputLabel id="multibox-label">Multibox</InputLabel>
            <Select
              required
              id="multibox"
              labelId="multibox-label"
              name="is_multibox"
              value={formInput["is_multibox"]}
              displayEmpty
              onChange={(event) => handleInputChange(event)}
            >
              {["Y", "N"].map((val, index) => (
                <MenuItem key={index} value={val}>
                  {val}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            margin="dense"
            id="threshold"
            name="threshold"
            value={formInput["threshold"]}
            onChange={(event) => handleInputChange(event)}
            label="Threshold"
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                width: "200px",
              },
              "& .MuiTextField-root": {
                m: 1,
                width: "22ch",
              },
            }}
          />
          <TextField
            margin="dense"
            id="ltlthreshold"
            name="ltl_threshold"
            value={formInput["ltl_threshold"]}
            onChange={(event) => handleInputChange(event)}
            label="LTL Threshold"
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                width: "200px",
              },
              "& .MuiTextField-root": {
                m: 1,
                width: "22ch",
              },
            }}
          />
          <TextField
            margin="dense"
            id="classnum"
            name="class_num"
            value={formInput["class_num"]}
            onChange={(event) => handleInputChange(event)}
            label="Class Number"
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                width: "200px",
              },
              "& .MuiTextField-root": {
                m: 1,
                width: "22ch",
              },
            }}
          />
        </div>
        <div className="znect__product-dialog__container">
          <TextField
            margin="dense"
            id="casepackqty"
            name="case_pack_quantity"
            value={formInput["case_pack_quantity"]}
            onChange={(event) => handleInputChange(event)}
            label="Casepack Quantity"
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                width: "220px",
              },
              "& .MuiTextField-root": {
                m: 1,
                width: "22ch",
              },
            }}
          />
          <TextField
            margin="dense"
            id="packageconfig"
            name="package_config"
            value={formInput["package_config"]}
            onChange={(event) => handleInputChange(event)}
            label="Package Configuration"
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                width: "320px",
              },
              "& .MuiTextField-root": {
                m: 1,
                width: "22ch",
              },
            }}
          />
          <TextField
            margin="dense"
            id="odoopid"
            name="odoo_pid"
            value={formInput["odoo_pid"]}
            onChange={(event) => handleInputChange(event)}
            label="Odoo PID"
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                width: "120px",
              },
              "& .MuiTextField-root": {
                m: 1,
                width: "22ch",
              },
            }}
          />
          <TextField
            margin="dense"
            id="odoouom"
            name="odoo_uom"
            value={formInput["odoo_uom"]}
            onChange={(event) => handleInputChange(event)}
            label="Odoo UOM"
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                width: "120px",
              },
              "& .MuiTextField-root": {
                m: 1,
                width: "22ch",
              },
            }}
          />
        </div>
        <div className="znect__product-dialog__container">
          <FormControl sx={{ width: 180 }}>
            <InputLabel id="add-to-odoo-label">Add to Odoo</InputLabel>
            <Select
              id="add_to_odoo"
              name="add_to_odoo"
              label="Add to Odoo"
              labelId="add-to-odoo-label"
              value={formInput["add_to_odoo"]}
              variant="outlined"
              onChange={handleInputChange}
            >
              <MenuItem value="No">No</MenuItem>
              <MenuItem value="Yes">Yes</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: 180 }} disabled={formInput["add_to_odoo"] !== "Yes"}>
            <InputLabel id="odoo-category-label">Odoo Category</InputLabel>
            <Select
              id="odoo_category"
              name="odoo_category"
              label="Odoo Category"
              labelId="odoo-category-label"
              value={formInput["odoo_category"]}
              onChange={handleInputChange}
              variant="outlined"
            >
              {[
                "All",
                "All / Bodysuits",
                "All / Coir",
                "All / Cushions",
                "All / Deliveries",
                "All / Dining & Barware",
                "All / Door Mats",
                "All / Expenses",
                "All / Firepit Accessories",
                "All / Firepits",
                "All / Furniture",
                "All / Hammocks",
                "All / Homeware",
                "All / Plant Care",
                "All / Saleable",
                "All / Yoga",
                "Cushions",
                "Pillows",
              ].map((category, idx) => (
                <MenuItem key={idx} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

export default ProductDialogForm;
