import React, { useEffect, useState, useMemo } from "react";
import "./products.css";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Badge from "@mui/material/Badge";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SkipPreviousOutlinedIcon from "@mui/icons-material/SkipPreviousOutlined";
import SkipNextOutlinedIcon from "@mui/icons-material/SkipNextOutlined";
import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { uploadOrderFile } from "../../redux/reducers/orders/order.thunks";

import {
  DataTable,
  ProductDrawer,
  ProductDialogForm,
  AlertSnackBar,
  AlertDialog,
  UploadFileDialog,
} from "../../components";
import {
  getProducts,
  addProduct,
  deleteProduct,
  getBuyboxReport,
} from "../../redux/reducers/products/products.thunks";
import actions from "../../redux/reducers/products/products.actions";
import TextField from "@mui/material/TextField";

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
  { key: "id", title: "ID" },
  { key: "sku", title: "SKU" },
  { key: "upc", title: "UPC" },
  { key: "name", title: "Product Title" },
  { key: "price", title: "Price" },
  { key: "manufacturer", title: "Manufacturer" },
];

const options = ["Delete"];

const productDetails = {
  sku: "",
  upc: "",
  name: "",
  price: "",
  length: "",
  width: "",
  height: "",
  size_uom: "",
  weight: "",
  weight_unit: "",
  shipping_length: "",
  shipping_width: "",
  shipping_height: "",
  shipping_weight: "",
  is_active: "",
  last_updated: "",
  manufacturer: "",
  is_multibox: "",
  odoo_pid: "",
  odoo_uom: "",
  ship_type: "",
  case_pack_quantity: "",
  package_config: "",
  estimated_cost: "",
  threshold: "",
  ltl_threshold: "",
  class_num: "",
};
const buyboxColumns = [
  { key: "sku", title: "SKU" },
  { key: "asin", title: "ASIN" },
  { key: "url", title: "URL" },
  { key: "buybox_winner", title: "Buybox Winner" },
  { key: "buybox_price", title: "Buybox Price" },
  { key: "buybox_delivery_date", title: "Buybox Delivery Date" },
  { key: "sold_by", title: "Sold By" },
  { key: "reason", title: "Reason" },
  { key: "comments", title: "Comments" },
  { key: "Env_price", title: "Env Price" },
  { key: "Env_delivery_date", title: "Env Delivery Date" },
  { key: "compitator_price", title: "Competitor Price" },
  { key: "compitator_deliver_date", title: "Competitor Delivery Date" },
  { key: "zip_code", title: "Zip Code" },
];

const Products = () => {
  const [searchItem, setSearchItem] = useState("");
  const [searchFilters, setSearchFilters] = useState({
    sku: "",
    asin: "",
    zip_code: "",
    buybox_winner: "",
  });
  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openReportDialog, setOpenReportDialog] = useState(false);
  const [toggleForm, setToggleForm] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [rowValue, setRowValue] = useState(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getBuyboxReport());
  }, [dispatch]);

  useEffect(() => {
    if (searchItem) {
      const newFilteredRows = product.products.filter(
        (row) => row.sku && row.sku.startsWith(searchItem)
      );
      dispatch(actions.filterProducts(newFilteredRows));
    } else {
      dispatch(actions.filterProducts(product.products));
    }
  }, [searchItem]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleFilterChange = (e) => {
    setSearchFilters({ ...searchFilters, [e.target.name]: e.target.value });
  };

  const filteredBuyboxReport = product.buyboxReport.filter((row) => {
    return (
      (row.sku?.toLowerCase() || "").includes(
        searchFilters.sku.toLowerCase()
      ) &&
      (row.asin?.toLowerCase() || "").includes(
        searchFilters.asin.toLowerCase()
      ) &&
      (row.zip_code?.toLowerCase() || "").includes(
        searchFilters.zip_code.toLowerCase()
      ) &&
      (row.buybox_winner?.toLowerCase() || "").includes(
        searchFilters.buybox_winner.toLowerCase()
      )
    );
  });

  const handleReportDialogOpen = () => {
    dispatch(getBuyboxReport()); // Call thunk to fetch data
    setOpenReportDialog(true);
  };

  const handleReportDialogClose = () => {
    setSearchFilters({ sku: "", asin: "", zip_code: "", buybox_winner: "" });
    setOpenReportDialog(false);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleUploadDialogOpen = () => {
    setUploadDialogOpen(true);
  };

  const handleUploadDialogClose = () => {
    setUploadDialogOpen(false);
  };

  const handleFileUpload = (csv, pdf) => {
    const formData = new FormData();
    if (csv) {
      formData.append("csvFile", csv);
    }

    dispatch(uploadOrderFile(formData));
    handleUploadDialogClose();
  };

  const handleClick = (sku) => {
    dispatch(actions.productFetchStart());
    dispatch(actions.productDetail(sku));
    setOpenDrawer(true);
  };

  const downloadCSV = () => {
    if (!product.buyboxReport.length) {
      alert("No data to download");
      return;
    }

    const csvHeaders =
      buyboxColumns.map((col) => `"${col.title}"`).join(",") + "\n";

    const csvRows = product.buyboxReport
      .map((row) =>
        buyboxColumns
          .map((col) => {
            let value = row[col.key] !== undefined ? row[col.key] : "";
            value = String(value).replace(/"/g, '""'); // Escape existing double quotes
            return `"${value}"`; // Wrap in double quotes
          })
          .join(",")
      )
      .join("\n");

    const csvContent = "data:text/csv;charset=utf-8," + csvHeaders + csvRows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "buybox_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setToggleForm(!toggleForm);
  };

  const priorityCounts = useMemo(() => {
    return product.buyboxReport.reduce(
      (acc, row) => {
        if (row.reason === "Selling Below MAP") acc.priority1 += 1;
        else if (row.reason && row.reason !== "None") acc.priority2 += 1;
        else acc.priority3 += 1;
        return acc;
      },
      { priority1: 0, priority2: 0, priority3: 0 }
    );
  }, [product.buyboxReport]);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
    dispatch(actions.clearProductDetail());
  };

  const submitProductData = (prodData) => {
    dispatch(addProduct(prodData));
  };

  const handleAlert = () => {
    dispatch(actions.clearAlert());
  };

  const handleAlertDialog = (actionFlag) => {
    setOpenAlertDialog(false);
    if (actionFlag) {
      dispatch(deleteProduct({ sku: rowValue.sku }));
    }
  };

  const handleOptionClick = (item, value) => {
    if (item === "Delete") {
      setRowValue(value);
      setOpenAlertDialog(true);
    }
  };

  return (
    <div className="znect__product-container">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 500 }}
        open={product.isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="znect__product-title">
        <h2>Products</h2>
        <Button
          variant="contained"
          onClick={handleReportDialogOpen}
          style={{ position: "relative", marginLeft: "900px" }}
        >
          <Badge
            badgeContent={priorityCounts.priority1 + priorityCounts.priority2}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "#1976D2", // Blue color
                color: "white",
                fontSize: "12px",
                fontWeight: "600",
                padding: "6px 12px",
                borderRadius: "12px", // Makes it pill-shaped
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", // Adds a soft shadow
              },
            }}
          >
            Amazon Buybox Report
          </Badge>
        </Button>
        <Button variant="contained" onClick={handleDialogOpen}>
          Add Product
        </Button>
      </div>
      {product.products && (
        <div className="znect__product-mainbox">
          <div className="znect__product-box">
            <div className="znect__product-box__tools">
              <div className="znect__product-box__search">
                <input
                  type="text"
                  id="search"
                  placeholder="search SKU"
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                />
                <CustomSearch className={{ color: "#909090" }} />
              </div>
              <div className="znect__product-box__tools-btn">
                <button
                  className="export add-product"
                  onClick={handleUploadDialogOpen}
                >
                  <CustomGetAppOutlinedIcon />
                  Import Product
                </button>
                <button className="export">
                  <CustomGetAppOutlinedIcon />
                  Export
                </button>
              </div>
            </div>
            <div className="znect__product-box__table">
              <DataTable
                rows={product.filterProducts.slice(startIndex, endIndex)}
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
          <div className="znect__product-container__page-controller">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              <CustomSkipPreviousOutlinedIcon />
            </button>
            <button
              onClick={handleNextPage}
              disabled={endIndex >= product.filterProducts.length}
            >
              <CustomSkipNextOutlinedIcon />
            </button>
            <p>
              Page {currentPage} of{" "}
              {Math.ceil(product.filterProducts.length / itemsPerPage)}
            </p>
          </div>
        </div>
      )}

      <ProductDrawer
        anchor="right"
        open={openDrawer}
        onClose={handleDrawerClose}
      />

      <ProductDialogForm
        open={openDialog}
        clear={toggleForm}
        handleClose={handleDialogClose}
        productDetails={productDetails}
        onDataSubmit={(prodData) => {
          submitProductData(prodData);
        }}
      />
      {/* Amazon Buybox Report Dialog */}
      <Dialog
        open={openReportDialog}
        onClose={handleReportDialogClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{ style: { minHeight: "80vh", minWidth: "90vw" } }}
      >
        <DialogTitle>
          Amazon Buybox Report
          <Button onClick={downloadCSV} style={{ float: "right" }}>
            <GetAppOutlinedIcon />
          </Button>
        </DialogTitle>
        <DialogContent>
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <TextField
              label="SKU"
              name="sku"
              variant="outlined"
              size="small"
              value={searchFilters.sku}
              onChange={handleFilterChange}
            />
            <TextField
              label="ASIN"
              name="asin"
              variant="outlined"
              size="small"
              value={searchFilters.asin}
              onChange={handleFilterChange}
            />
            <TextField
              label="Zip Code"
              name="zip_code"
              variant="outlined"
              size="small"
              value={searchFilters.zip_code}
              onChange={handleFilterChange}
            />
            <TextField
              label="Buybox Winner"
              name="buybox_winner"
              variant="outlined"
              size="small"
              value={searchFilters.buybox_winner}
              onChange={handleFilterChange}
            />
          </div>
          {product.isLoading ? (
            <p>Loading...</p>
          ) : filteredBuyboxReport.length > 0 ? (
            <DataTable
              rows={[...filteredBuyboxReport]
                .sort((a, b) => {
                  const getPriority = (row) => {
                    if (row.reason === "Selling Below MAP") return 1;
                    if (row.reason && row.reason !== "None") return 2;
                    return 3;
                  };
                  return getPriority(a) - getPriority(b);
                })
                .map((row) => ({
                  ...row,
                  priority:
                    row.reason === "Selling Below MAP"
                      ? 1
                      : row.reason && row.reason !== "None"
                      ? 2
                      : 3,
                }))}
              columns={buyboxColumns}
              options={{
                tableLayout: "auto",
                rowsPerPage: 10,
                page: 0,
                search: true,
                rowStyle: (rowData) => ({
                  backgroundColor:
                    rowData.priority === 1
                      ? "rgba(255, 0, 0, 0.2)"
                      : rowData.priority === 2
                      ? "rgba(255, 255, 0, 0.3)"
                      : "transparent",
                }),
              }}
            />
          ) : (
            <p>No data available.</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReportDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <UploadFileDialog
        open={uploadDialogOpen}
        handleClose={handleUploadDialogClose}
        handleUpload={(csv) => handleFileUpload(csv)}
        showPdf={false}
        multiCsv={false}
        title="Upload Product File"
        body="Upload the product CSV file here. Do not upload any other CSVs. Make sure the file is in CSV format and no errors are present in the file."
      />
      <AlertSnackBar
        open={Boolean(product.errorMsg) || Boolean(product.successMsg)}
        msg={Boolean(product.errorMsg) ? product.errorMsg : product.successMsg}
        severity={product.errorSeverity}
        handleAlertClose={handleAlert}
      />
      <AlertDialog
        title="Are you sure ?"
        body="Deleting the product may affect the program cycle. Proceed only if you are certain."
        open={openAlertDialog}
        handleAction={(actionFlag) => {
          handleAlertDialog(actionFlag);
        }}
      />
    </div>
  );
};

export default Products;
