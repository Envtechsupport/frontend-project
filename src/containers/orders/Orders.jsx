import React, { useEffect, useState, useMemo } from "react";
import "./orders.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";
import Backdrop from "@mui/material/Backdrop";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import {
  DataTable,
  SmallDatePicker,
  AlertDialog,
  UploadFileDialog,
  AlertSnackBar,
} from "../../components";
import SkipPreviousOutlinedIcon from "@mui/icons-material/SkipPreviousOutlined";
import SkipNextOutlinedIcon from "@mui/icons-material/SkipNextOutlined";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrders,
  markOrderManual,
  reprocessOrder,
  uploadOrderFile,
  searchOrderByPONumber,
  searchOrderByStatus,
  searchOrdersByDate,
} from "../../redux/reducers/orders/order.thunks";
import actions from "../../redux/reducers/orders/order.actions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

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
  { key: "customer_po", title: "PO Number" },
  { key: "po_date", title: "PO Date" },
  { key: "order_number", title: "Order No" },
  { key: "odoo_order_id", title: "Odoo ID" },
  { key: "customer_name", title: "Partner" },
  { key: "status", title: "Status" },
  { key: "error_description", title: "Error" },
];

const options = ["Mark Manual", "Reprocess", "Delete"];

const Orders = () => {
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const order = useSelector((state) => state.order);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchItem, setSearchItem] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [rowValue, setRowValue] = useState(null);
  const [alertInfo, setAlertInfo] = useState({
    alertMode: "",
    alertTitle: "",
    alertBody: "",
    singleInput: false,
  });
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUploadDialogClose = () => {
    setUploadDialogOpen(false);
  };

  const handleUploadDialogOpen = () => {
    setUploadDialogOpen(true);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    const formattedDate = newDate ? dayjs(newDate).format("YYYY-MM-DD") : null;
    formattedDate
      ? dispatch(searchOrdersByDate(formattedDate))
      : dispatch(getOrders(currentPage, itemsPerPage));
  };

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < order.total) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleDelete = () => {
    setSelectedDate(null);
    setFilterStatus("");
    dispatch(getOrders(currentPage, itemsPerPage));
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const trimmedSearchItem = searchItem.trim();
    if (!trimmedSearchItem) {
      return dispatch(getOrders(currentPage, itemsPerPage));
    }
    dispatch(searchOrderByPONumber(trimmedSearchItem));
  };

  const handleFileUpload = (csv, pdf) => {
    const formData = new FormData();
    if (csv) {
      formData.append("csvFile", csv);
    }
    pdf.forEach((file) => {
      formData.append("pdfFiles", file);
    });

    dispatch(uploadOrderFile(formData));
    handleUploadDialogClose();
  };

  const handleAlertDialog = (actionFlag) => {
    setOpenAlertDialog(false);
    if (actionFlag && alertInfo.alertMode === "MP") {
      const payload = { po_number: rowValue.customer_po };
      dispatch(markOrderManual(payload));
    }
  };

  const handleOptionClick = (item, value) => {
    if (item === "Mark Manual") {
      setRowValue(value);
      setAlertInfo({
        alertMode: "MP",
        alertTitle: "Do you want to mark this PO manual?",
        alertBody:
          "Only switch this order to manual processing if you are certain.",
        singleInput: false,
      });
      setOpenAlertDialog(true);
    } else if (item === "Reprocess") {
      if (value.status === "Received" && value.error_description) {
        dispatch(reprocessOrder({ po_number: value.customer_po }));
      } else {
        setAlertInfo({
          alertMode: "OTH",
          alertTitle: "Cannot Reprocess",
          alertBody:
            "This PO number cannot be reprocessed as it's already processed.",
          singleInput: true,
        });
        setOpenAlertDialog(true);
      }
    }
  };

  const handleClick = (poNumber) => {
    const orderInf = order.filterOrders.find(
      (ord) => ord.customer_po === poNumber
    );
    if (
      orderInf &&
      orderInf.status === "Received" &&
      orderInf.error_description !== "None"
    ) {
      setAlertInfo({
        alertMode: "OTH",
        alertTitle: "Order information not available",
        alertBody:
          "Order information is not available for this PO Number. Try reprocessing the order or delete it.",
        singleInput: true,
      });
      setOpenAlertDialog(true);
    } else {
      navigate(`/order/${encodeURIComponent(poNumber)}`);
    }
  };

  const handleAlert = () => {
    dispatch(actions.clearAlert());
  };

  const filteredOrders = useMemo(
    () =>
      order.orderList.filter(
        (row) =>
          (!filterStatus || row.status === filterStatus) &&
          (!selectedDate ||
            dayjs(row.status_timestamp).isSame(selectedDate, "day")) &&
          (!searchItem || row.customer_po.startsWith(searchItem))
      ),
    [order.orderList, filterStatus, selectedDate, searchItem]
  );

  const handleStatusChange = (event) => {
    const selectedStatus = event.target.value;
    setFilterStatus(selectedStatus);

    // Dispatch the searchOrderByStatus thunk
    if (selectedStatus) {
      dispatch(searchOrderByStatus(selectedStatus)); // This should fetch orders with the latest status
    } else {
      // Fetch all orders if no status is selected
      dispatch(getOrders(currentPage, itemsPerPage));
    }
  };

  // Add a side effect to fetch all orders when searchItem is cleared
  useEffect(() => {
    if (searchItem === "") {
      // When the input is cleared, reload all orders
      dispatch(getOrders(currentPage, itemsPerPage));
    }
  }, [searchItem, dispatch, currentPage, itemsPerPage]);

  // Update order.filterOrders when filteredOrders changes
  useEffect(() => {
    dispatch(actions.filterOrders(filteredOrders));
  }, [filteredOrders, dispatch]);

  const totalPages =
    filterStatus || selectedDate || searchItem
      ? Math.ceil(filteredOrders.length / itemsPerPage) // When filter is applied
      : Math.ceil(order.total / itemsPerPage);

  useEffect(() => {
    dispatch(getOrders(currentPage, itemsPerPage));
  }, [dispatch, currentPage, itemsPerPage]);

  return (
    <div className="znect__order-container">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={order.isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="znect__order-title">
        <h2>Orders</h2>
        <button className="export" style={{ marginLeft: "900px" }}>
          <CustomGetAppOutlinedIcon />
          Export
        </button>
        <Button onClick={handleUploadDialogOpen}>Add Order</Button>
      </div>
      {order.filterOrders && (
        <div className="znect__order-mainbox">
          <div className="znect__order-box">
            <div className="znect__order-box__tools">
              <div className="znect__order-box__search">
                <form onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    id="search"
                    placeholder="search po number"
                    value={searchItem}
                    onChange={(e) => setSearchItem(e.target.value)}
                  />
                  <button type="submit" disabled={order.isLoading}>
                    <CustomSearch className={{ color: "#909090" }} />
                  </button>
                </form>
              </div>
              <div className="znect__order-box__tools-btn">
                <Select
                  name="filterStatus"
                  value={filterStatus}
                  onChange={(event) => handleStatusChange(event)}
                  sx={{
                    width: 410,
                    height: 38,
                    borderRadius: 2,
                  }}
                  displayEmpty
                >
                  <MenuItem value="">All</MenuItem>
                  {[
                    "Received",
                    "Entered",
                    "Pending",
                    "Manual",
                    "Shipped",
                    "Shipment Sent",
                    "Odoo Added",
                    "Invoice Sent",
                    "Shipping Label Not created",
                  ].map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                <SmallDatePicker
                  selectedDate={selectedDate}
                  onDateChange={handleDateChange}
                />
                <div>
                  <span
                    style={{
                      fontWeight: "normal", // Lighter weight
                      color: "#888", // Lighter color (gray)
                    }}
                  >
                    Items Per Page:
                  </span>
                  <Select
                    name="itemsPerPage"
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(e.target.value);
                      setCurrentPage(1); // Reset to the first page when items per page changes
                    }}
                    sx={{
                      width: 70,
                      height: 30,
                    }}
                  >
                    {[15, 30, 50].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
            {selectedDate && (
              <Stack direction="row" spacing={1}>
                <Chip
                  label={dayjs(selectedDate).format("YYYY-MM-DD")}
                  onDelete={handleDelete}
                />
              </Stack>
            )}
            <div className="znect__order-box__table">
              <Divider sx={{ marginBottom: 2 }} />
              <Box
                sx={{
                  border: "1px solid #e0e0e0", // Border color
                  borderRadius: 2, // Rounded corners
                  padding: 2, // Padding inside the box
                  boxShadow: 2, // Optional shadow for depth
                  backgroundColor: "#fff", // Background color
                }}
              >
                <DataTable
                  rows={order.filterOrders}
                  columns={columns}
                  options={options}
                  handleRowClick={(poNumber) => {
                    handleClick(poNumber);
                  }}
                  onOptionClick={(item, value) =>
                    handleOptionClick(item, value)
                  }
                  passValue="customer_po"
                  toolTipIndex={5}
                />
              </Box>
              <Divider sx={{ marginTop: 2 }} />
            </div>
          </div>
          <div className="znect__order-container__page-controller">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              <CustomSkipPreviousOutlinedIcon />
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage * itemsPerPage >= order.total}
            >
              <CustomSkipNextOutlinedIcon />
            </button>
            <p>
              Page {currentPage} of {totalPages}
            </p>
          </div>
        </div>
      )}
      <AlertDialog
        title={alertInfo.alertTitle}
        body={alertInfo.alertBody}
        singleInput={alertInfo.singleInput}
        open={openAlertDialog}
        handleAction={(actionFlag) => {
          handleAlertDialog(actionFlag);
        }}
      />
      <UploadFileDialog
        open={uploadDialogOpen}
        handleClose={handleUploadDialogClose}
        handleUpload={(csv, pdf) => handleFileUpload(csv, pdf)}
        showPdf={true}
        multiCsv={false}
        title="Upload Order File"
        body="Upload the order CSV file here. Do not upload any other CSVs. Make sure the file is in CSV format and no errors are present in the file."
      />
      <AlertSnackBar
        open={Boolean(order.errorMsg) || Boolean(order.successMsg)}
        msg={Boolean(order.errorMsg) ? order.errorMsg : order.successMsg}
        severity={order.errorSeverity}
        handleAlertClose={() => handleAlert()}
      />
    </div>
  );
};

export default Orders;
