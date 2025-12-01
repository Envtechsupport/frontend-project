import React, { useEffect, useState } from "react";
import "./inventorylist.css";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { styled } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import {
  deleteFullInventory,
  getInventories,
  uploadInvFile,
  exportInv,
} from "../../redux/reducers/inventorylist/inventorylist.thunks";
import {
  DataTable,
  InvDrawer,
  AlertSnackBar,
  AlertDialog,
  AddInvDialog,
  UploadFileDialog,
} from "../../components";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import actions from "../../redux/reducers/inventorylist/inventorylist.actions";
import SkipPreviousOutlinedIcon from "@mui/icons-material/SkipPreviousOutlined";
import SkipNextOutlinedIcon from "@mui/icons-material/SkipNextOutlined";

const CustomAddOutlinedIcon = styled(AddOutlinedIcon)({
  color: "#fff",
  fontSize: "18px",
  marginRight: "5px",
});

const CustomSearch = styled(SearchRoundedIcon)({
  color: "#909090",
});

const CustomSkipPreviousOutlinedIcon = styled(SkipPreviousOutlinedIcon)({
  color: "#909090",
  fontSize: "24px",
});

const CustomSkipNextOutlinedIcon = styled(SkipNextOutlinedIcon)({
  color: "#909090",
  fontSize: "24px",
});

const CustomGetAppOutlinedIcon = styled(GetAppOutlinedIcon)({
  color: "#fff",
  fontSize: "15px",
  marginRight: "5px",
});

const columns = [
  { key: "sku", title: "SKU" },
  { key: "total_quantity", title: "Total Quantity" },
  { key: "last_updated", title: "Last Updated On" },
];

const options = ["Delete"];

const InventorList = () => {
  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchItem, setSearchItem] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [alertBox, setAlertBox] = useState({
    title: "",
    body: "",
    open: false,
    mode: "",
  });
  const [flaggedRow, setFlaggedRow] = useState(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state.inventory);
  const exports = useSelector((state) => state.inventory.exports);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleClick = (sku) => {
    const selectedSku = inventory.filterInventories.filter(
      (inv) => inv.sku === sku
    );
    dispatch(actions.selectedInventory(selectedSku[0]));
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
  };

  const handleAddDialogOpen = () => {
    setAddDialogOpen(true);
  };

  const handleOptionClick = (item, value) => {
    if (item === "Delete") {
      console.log(value);
      setFlaggedRow(value);
      setAlertBox({
        title: "Delete Inventory",
        body: "Are you sure you want to delete the inventory?",
        open: true,
        mode: "delete",
      });
    }
  };

  const handleExport = async () => {
    await dispatch(exportInv()); // Access exported data from Redux store

    // Convert the `exports` array to CSV format
    const csvContent = convertToCSV(exports); // Implement your CSV conversion function

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "inventory.csv");
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
  };

  // Utility function to convert the data to CSV format
  const convertToCSV = (data) => {
    const headers = Object.keys(data[0]);
    const rows = data.map((item) => Object.values(item));

    let csv = headers.join(",") + "\n";
    rows.forEach((row) => {
      csv += row.join(",") + "\n";
    });

    return csv;
  };

  const handleUploadDialogClose = () => {
    setUploadDialogOpen(false);
  };

  const handleUploadDialogOpen = () => {
    setUploadDialogOpen(true);
  };

  const handleFileUpload = (csv, pdf) => {
    const formData = new FormData();
    if (csv) {
      csv.forEach((file, index) => {
        formData.append(`csvFile`, file);
      });
    }
    dispatch(uploadInvFile(formData));
    handleUploadDialogClose();
  };

  const handleAlert = () => {
    dispatch(actions.clearAlert());
  };

  const handleAlertDialog = (actionFlag) => {
    setAlertBox({
      ...alertBox,
      open: false,
    });
    if (actionFlag && alertBox.mode === "delete") {
      dispatch(deleteFullInventory({ sku: flaggedRow.sku }));
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleSearch = () => {
    if (!searchItem.trim()) {
      dispatch(actions.filterInventory(inventory.inventories)); // Reset to full list
    } else {
      const filteredRows = inventory.inventories.filter((row) =>
        row.sku && row.sku.toUpperCase().includes(searchItem.toUpperCase()) // ✅ Check for null before calling `toUpperCase()`
      );
      dispatch(actions.filterInventory(filteredRows));
    }
    setCurrentPage(1);
  };  

  const handleClearSearch = () => {
    setSearchItem("");
    dispatch(actions.filterInventory(inventory.inventories)); // Reset full list
  };

  useEffect(() => {
    handleSearch(); // Automatically filter as user types
  }, [searchItem]);

  useEffect(() => {
    dispatch(getInventories());
  }, [dispatch]);

  return (
    <div className="znect__inventorylist-container">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 500 }}
        open={inventory.isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="znect__inventorylist-title">
        <h2 className="znect__inventorylist-title-content">Inventory</h2>
        <div className="znect__inventorylist-title-btn">
          <Button variant="contained" onClick={handleUploadDialogOpen}>
            Add CSV
          </Button>
          <Button variant="contained" onClick={handleAddDialogOpen}>
            Add Inv
          </Button>
        </div>
      </div>
      {inventory.filterInventories && (
        <div className="znect__inventory-mainbox">
          <div className="znect__inventorylist-box">
            <div className="znect__inventorylist-box__tools">
              <div className="znect__inventorylist-box__search">
                <input
                  type="text"
                  id="search"
                  placeholder="search SKU"
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                />
                <CustomSearch onClick={handleSearch} />
              </div>
              <div className="znect__inventorylist-box__tools-btn">
                <button className="export" onClick={handleExport}>
                  <CustomGetAppOutlinedIcon />
                  Export
                </button>
              </div>
            </div>
            <div className="znect__inventorylist-box__table">
              <DataTable
                rows={inventory.filterInventories.slice(startIndex, endIndex)}
                columns={columns}
                options={options}
                handleRowClick={(sku) => {
                  handleClick(sku);
                }}
                onOptionClick={(item, value) => handleOptionClick(item, value)}
                passValue="sku"
              />
            </div>
          </div>
          <div className="znect__inventorylist-container__page-controller">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              <CustomSkipPreviousOutlinedIcon />
            </button>
            <button
              onClick={handleNextPage}
              disabled={endIndex >= inventory.filterInventories.length}
            >
              <CustomSkipNextOutlinedIcon />
            </button>
            <p>
              Page {currentPage} of{" "}
              {Math.ceil(inventory.filterInventories.length / itemsPerPage)}
            </p>
          </div>
        </div>
      )}
      {inventory.selectedInventory && (
        <InvDrawer
          anchor="right"
          open={openDrawer}
          onClose={handleDrawerClose}
          data={inventory.selectedInventory}
        />
      )}
      <AlertSnackBar
        open={Boolean(inventory.errorMsg) || Boolean(inventory.successMsg)}
        msg={
          Boolean(inventory.errorMsg)
            ? inventory.errorMsg
            : inventory.successMsg
        }
        severity={inventory.errorSeverity}
        handleAlertClose={handleAlert}
      />
      <AlertDialog
        title={alertBox.title}
        body={alertBox.body}
        open={alertBox.open}
        handleAction={(actionFlag) => {
          handleAlertDialog(actionFlag);
        }}
      />
      <AddInvDialog open={addDialogOpen} handleClose={handleAddDialogClose} />
      <UploadFileDialog
        open={uploadDialogOpen}
        handleClose={handleUploadDialogClose}
        handleUpload={(csv, pdf) => handleFileUpload(csv, pdf)}
        showPdf={false}
        multiCsv={true}
        title="Upload Inventory File"
        body="Upload the inventory CSV file here. Do not upload any other CSVs. Make sure the file is in CSV format and no errors are present in the file."
      />
    </div>
  );
};

export default InventorList;
