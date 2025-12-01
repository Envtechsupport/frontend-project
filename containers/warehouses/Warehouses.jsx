import React, { useEffect, useState } from "react";
import "./warehouses.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SkipPreviousOutlinedIcon from "@mui/icons-material/SkipPreviousOutlined";
import SkipNextOutlinedIcon from "@mui/icons-material/SkipNextOutlined";
import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";
import { getWarehouses } from "../../redux/reducers/warehouses/warehouses.thunks";
import { useDispatch, useSelector } from "react-redux";
import {
  DataTable,
  WarehouseDrawer,
  WarehouseDialogForm,
  AlertSnackBar,
  AlertDialog,
} from "../../components";
import actions from "../../redux/reducers/warehouses/warehouses.actions";
import {
  addWarehouse,
  deleteWarehouse,
} from "../../redux/reducers/warehouses/warehouses.thunks";

const CustomAddOutlinedIcon = styled(AddOutlinedIcon)({
  color: "#fff",
  fontSize: "18px",
  marginRight: "5px",
});

const CustomSearch = styled(SearchRoundedIcon)({
  color: "#909090",
});

const CustomGetAppOutlinedIcon = styled(GetAppOutlinedIcon)({
  color: "#fff",
  fontSize: "15px",
  marginRight: "5px",
});

const CustomSkipPreviousOutlinedIcon = styled(SkipPreviousOutlinedIcon)({
  color: "#909090",
  fontSize: "24px",
});

const CustomSkipNextOutlinedIcon = styled(SkipNextOutlinedIcon)({
  color: "#909090",
  fontSize: "24px",
});

const columns = [
  { key: "warehouse_id", title: "Warehouse ID" },
  { key: "seller_partner_id", title: "Seller ID" },
  { key: "name", title: "Warehouse Name" },
  { key: "state", title: "State" },
  { key: "zip", title: "Zipcode" },
  { key: "add_odoo", title: "Add Odoo" },
];

const options = ["Delete"];

const warehouseDetails = {
  seller_partner_id: "",
  warehouse_id: "",
  phone_number: "",
  name: "",
  street1: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  cut_off: "",
  add_odoo: "",
  pickup_day: "",
};

const Warehouses = () => {
  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchItem, setSearchItem] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [toggleForm, setToggleForm] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [rowValue, setRowValue] = useState(null);

  const dispatch = useDispatch();
  const warehouse = useSelector((state) => state.warehouse);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    dispatch(getWarehouses());
  }, [dispatch]);

  useEffect(() => {
    if (searchItem) {
      const newFilteredRows = warehouse.warehouses.filter((row) =>
        row.name.startsWith(searchItem)
      );
      dispatch(actions.filterWarehouses(newFilteredRows));
    } else {
      dispatch(actions.filterWarehouses(warehouse.warehouses));
    }
  }, [searchItem]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleClick = (warehouseId) => {
    dispatch(actions.fetchStart());
    dispatch(actions.warehouseDetail(warehouseId));
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
    dispatch(actions.clearWarehouseDetail());
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setToggleForm(!toggleForm);
  };

  const submitWarehouseData = (warehouseData) => {
    dispatch(addWarehouse(warehouseData));
  };

  const handleAlert = () => {
    dispatch(actions.clearAlert());
  };

  const handleAlertDialog = (actionFlag) => {
    setOpenAlertDialog(false);
    if (actionFlag) {
      dispatch(deleteWarehouse({ warehouse_id: rowValue.warehouse_id }));
    }
  };

  const handleOptionClick = (item, value) => {
    if (item === "Delete") {
      setRowValue(value);
      setOpenAlertDialog(true);
    }
  };

  return (
    <div className="znect__warehouse-container">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 500 }}
        open={warehouse.isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="znect__warehouse-title">
        <h2>Warehouses</h2>
        <Button variant="contained" onClick={handleDialogOpen}>
          Add Warehouse
        </Button>
      </div>
      {warehouse.filterWarehouses && (
        <div className="znect__warehouse-mainbox">
          <div className="znect__warehouse-box">
            <div className="znect__warehouse-box__tools">
              <div className="znect__warehouse-box__search">
                <input
                  type="text"
                  id="search"
                  placeholder="search warehouse"
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                />
                <CustomSearch className={{ color: "#909090" }} />
              </div>
              <div className="znect__warehouse-box__tools-btn">
                <button className="export">
                  <CustomGetAppOutlinedIcon />
                  Export
                </button>
              </div>
            </div>
            <div className="znect__warehouse-box__table">
              <DataTable
                rows={warehouse.filterWarehouses.slice(startIndex, endIndex)}
                columns={columns}
                options={options}
                handleRowClick={(warehouseId) => {
                  handleClick(warehouseId);
                }}
                onOptionClick={(item, value) => handleOptionClick(item, value)}
                passValue="warehouse_id"
              />
            </div>
          </div>
          <div className="znect__warehouse-container__page-controller">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              <CustomSkipPreviousOutlinedIcon />
            </button>
            <button
              onClick={handleNextPage}
              disabled={endIndex >= warehouse.filterWarehouses.length}
            >
              <CustomSkipNextOutlinedIcon />
            </button>
            <p>
              Page {currentPage} of{" "}
              {Math.ceil(warehouse.filterWarehouses.length / itemsPerPage)}
            </p>
          </div>
        </div>
      )}
      <WarehouseDrawer
        anchor="right"
        open={openDrawer}
        onClose={handleDrawerClose}
      />
      <WarehouseDialogForm
        open={openDialog}
        clear={toggleForm}
        handleClose={handleDialogClose}
        warehouseDetails={warehouseDetails}
        onDataSubmit={(warehouseData) => {
          submitWarehouseData(warehouseData);
        }}
      />
      <AlertSnackBar
        open={Boolean(warehouse.errorMsg) || Boolean(warehouse.successMsg)}
        msg={
          Boolean(warehouse.errorMsg)
            ? warehouse.errorMsg
            : warehouse.successMsg
        }
        severity={warehouse.errorSeverity}
        handleAlertClose={handleAlert}
      />
      <AlertDialog
        title="Are you sure ?"
        body="Deleting the warehouse may affect the program cycle. Proceed only if you are certain."
        open={openAlertDialog}
        handleAction={(actionFlag) => {
          handleAlertDialog(actionFlag);
        }}
      />
    </div>
  );
};

export default Warehouses;
