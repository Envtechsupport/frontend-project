import React, { useState } from "react";
import "./invdrawer.css";
import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { EditableTable, AlertDialog } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  addWarehouseInventory,
  deleteWarehouseInventory,
  updateInventory,
} from "../../redux/reducers/inventorylist/inventorylist.thunks";

const columns = [
  { headerName: "Warehouse ID", field: "warehouse_id" },
  { headerName: "Trader ID", field: "trader_id" },
  { headerName: "Seller Partner ID", field: "seller_partner_id" },
  { headerName: "Quantity", field: "quantity" },
  { headerName: "Backorder Qty", field: "backorder_quantity" },
];

const InvDrawer = ({ anchor, open, onClose, data }) => {
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state.inventory);
  const [input, setInput] = useState({
    warehouse_id: "",
    trader_id: "",
    seller_partner_id: "",
    quantity: "",
    backorder_quantity: "",
  });
  const [error, setError] = useState("");
  const [toggleAddBtn, setToggleAddBtn] = useState(false);
  const [alertBox, setAlertBox] = useState({
    title: "",
    body: "",
    open: false,
    mode: "",
  });
  const [flaggedRow, setFlaggedRow] = useState(null);

  const handleAlertDialog = (actionFlag) => {
    setAlertBox({
      ...alertBox,
      open: false,
    });
    if (actionFlag && alertBox.mode === "delete_inv") {
      const payload = {
        sku: inventory.selectedInventory.sku,
        warehouse_id: flaggedRow.warehouse_id,
      };
      dispatch(deleteWarehouseInventory(payload));
    }
  };

  const updateWarehouseInventory = (warehouseInv) => {
    const payload = {
      sku: data.sku,
      warehouses: [warehouseInv],
    };
    dispatch(updateInventory(payload));
  };

  const deleteWarehouseInventoy = (row) => {
    setFlaggedRow(row);
    setAlertBox({
      title: "Delete Warehouse Inventory",
      body: "Are you sure you want to delete the inventory for the warehouse?",
      open: true,
      mode: "delete_inv",
    });
  };

  const handleAddBtn = () => {
    setToggleAddBtn(true);
  };

  const handleAddCancel = () => {
    setToggleAddBtn(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newInputs = { ...input };
    newInputs[name] = value;
    setInput(newInputs);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !input.warehouse_id ||
      !input.trader_id ||
      !input.seller_partner_id ||
      !input.quantity ||
      !input.backorder_quantity
    ) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    const payload = {
      sku: data.sku,
      warehouses: [input],
    };
    dispatch(addWarehouseInventory(payload));
    setToggleAddBtn(false);
    setInput({
      warehouse_id: "",
      trader_id: "",
      seller_partner_id: "",
      quantity: "",
      backorder_quantity: "",
    });
  };

  return (
    <Drawer anchor={anchor} open={open} onClose={onClose}>
      <div className="znect__invdrawer-container">
        <h2>Inventory By Warehouse</h2>
        <h3>{data.sku}</h3>
        <EditableTable
          rows={data.warehouses}
          columns={columns}
          noEdit="warehouse_id"
          onEdit={(warehouseInv) => updateWarehouseInventory(warehouseInv)}
          onDelete={(row) => deleteWarehouseInventoy(row)}
        />
        {toggleAddBtn && (
          <form onSubmit={handleSubmit}>
            <div className="znect__invdrawer-form">
              <FormControl error={Boolean(error)}>
                <TextField
                  name="warehouse_id"
                  label="Warehouse ID"
                  value={input.warehouse_id}
                  onChange={(event) => handleChange(event)}
                  variant="outlined"
                  required
                  size="small"
                  sx={{ width: 160 }}
                />
              </FormControl>
              <FormControl error={Boolean(error)}>
                <TextField
                  name="trader_id"
                  label="Trader ID"
                  value={input.trader_id}
                  onChange={(event) => handleChange(event)}
                  variant="outlined"
                  required
                  size="small"
                  sx={{ width: 160 }}
                />
              </FormControl>
              <FormControl error={Boolean(error)}>
                <TextField
                  name="seller_partner_id"
                  label="Seller Partner ID"
                  value={input.seller_partner_id}
                  onChange={(event) => handleChange(event)}
                  variant="outlined"
                  required
                  size="small"
                  sx={{ width: 160 }}
                />
              </FormControl>
              <FormControl error={Boolean(error)}>
                <TextField
                  name="quantity"
                  label="Quantity"
                  value={input.quantity}
                  onChange={(event) => handleChange(event)}
                  variant="outlined"
                  required
                  size="small"
                  sx={{ width: 160 }}
                />
              </FormControl>
              <FormControl error={Boolean(error)}>
                <TextField
                  name="backorder_quantity"
                  label="Backorder Qty"
                  value={input.backorder_quantity}
                  onChange={(event) => handleChange(event)}
                  variant="outlined"
                  required
                  size="small"
                  sx={{ width: 160 }}
                />
              </FormControl>
            </div>
            <div className="znect__invdrawer__formbtn">
              <Button type="submit" autoFocus>
                Save
              </Button>
              <Button onClick={handleAddCancel}>Cancel</Button>
            </div>
          </form>
        )}
        {!toggleAddBtn &&
          Boolean(inventory.selectedInventory.warehouses.length) && (
            <div className="znect__invdrawer-addbtn">
              <Button onClick={handleAddBtn}>Add Warehouse</Button>{" "}
            </div>
          )}
      </div>
      <AlertDialog
        title={alertBox.title}
        body={alertBox.body}
        open={alertBox.open}
        handleAction={(actionFlag) => {
          handleAlertDialog(actionFlag);
        }}
      />
    </Drawer>
  );
};

export default InvDrawer;
