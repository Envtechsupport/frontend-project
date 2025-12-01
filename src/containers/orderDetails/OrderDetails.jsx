import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import "./orderdetails.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  getOrderDetails,
  markOrderManual,
  addPackage,
  deletePackage,
  updateTrackingInfo,
  sendShipment,
  sendInvoice,
  addOdoo,
  createLabel,
  getActivities,
  getLabel,
} from "../../redux/reducers/orders/order.thunks";
import {
  ItemTable,
  PackageDialog,
  AlertSnackBar,
  EmptyState,
  AlertDialog,
  InputTrackingDialog,
} from "../../components";
import actions from "../../redux/reducers/orders/order.actions";
import {
  getStatus,
  formatTimestamp,
  getPartnerName,
  formatAddress,
  convertToTime,
  hasEmptyOrUndefined,
} from "../../utilities/utils";

const CustomArrowBackIcon = styled(ArrowBackIcon)({
  color: "#909090",
  fontSize: "24px",
});

const OrderDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showTable, setShowTable] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const order = useSelector((state) => state.order);
  const { poNumber } = useParams();
  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const [pkgCheck, setPkgCheck] = useState(true);
  const [trackingDialogOpen, setTrackingDialogOpen] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [rowValue, setRowValue] = useState(null);
  const [alertBox, setAlertBox] = useState({
    title: "",
    body: "",
    open: false,
    mode: "",
  });
  const [alertInfo, setAlertInfo] = useState({
    alertMode: "",
    alertTitle: "",
    alertBody: "",
    singleInput: false,
  });

  // Label viewer state
  const [labelDialogOpen, setLabelDialogOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [currentPo, setCurrentPo] = useState(null);
  const [labelLoading, setLabelLoading] = useState(false);

  // Clean up blob URL on unmount or url change
  useEffect(() => {
    return () => {
      if (pdfUrl && pdfUrl.startsWith("blob:")) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  const handleRowClick = (poNumber) => {
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

  const onOptionClick = (item, value) => {
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
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (operation) => {
    setAnchorEl(null);
    if (operation === "tracking") {
      if (order.orderDetail.package_info === null)
        setAlertMsg("Add packages first");
      else {
        setAlertBox({
          title: "Update Tracking",
          body: "Are you sure you want to add the tracking number to this order?",
          open: true,
          mode: "tracking",
        });
      }
    } else if (operation === "manual") {
      setAlertBox({
        title: "Mark Manual",
        body: "Are you sure you want to change the order status to Manual?",
        open: true,
        mode: "manual",
      });
    } else if (operation === "shipment") {
      setAlertBox({
        title: "Send Tracking Update",
        body: "Are you sure you want to send the tracking information to the partner?",
        open: true,
        mode: "shipment",
      });
    } else if (operation === "invoice") {
      setAlertBox({
        title: "Send Invoice",
        body: "Are you sure you want to send the invoice to the partner?",
        open: true,
        mode: "invoice",
      });
    } else if (operation === "odoo") {
      setAlertBox({
        title: "Odoo Process",
        body: "Are you sure you want to add this order to Odoo?",
        open: true,
        mode: "odoo",
      });
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleTrackingClose = () => {
    setTrackingDialogOpen(false);
  };

  const goBack = () => {
    navigate(-1);
    setTimeout(function () {
      dispatch(actions.clearOrderDetails());
    }, 2000);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePkgDialog = () => {
    if (
      ["IC", "SLC", "SH", "IS", "OC", "OF"].includes(
        order.orderDetail.orders.status
      )
    ) {
      setAlertMsg("Packages cannot be added to this PO");
    } else if (pkgCheck && Boolean(order.orderDetail.package_info)) {
      setAlertBox({
        title: "Package already exists",
        body: "Packages are already available for this PO. Are you sure you want to add additional packages?",
        open: true,
        mode: "package",
      });
    } else {
      setOpen(true);
    }
  };

  const handleAlertClose = () => {
    setAlertMsg("");
  };

  const handleLabelGen = () => {
    if (order.orderDetail.package_info == null) {
      setAlertMsg("Packages must be added first");
    } else if (
      order.orderDetail.orders.ship_type &&
      order.orderDetail.orders.ship_type === "LTL"
    ) {
      setAlertMsg("Labels cannot be generated for LTL");
    } else {
      setAlertBox({
        title: "Label Generation",
        body: "Are you sure you want to create labels for this PO ?",
        open: true,
        mode: "label",
      });
    }
  };

  const handleAlertDialog = (actionFlag) => {
    // Closing alert dialog
    setAlertBox({
      ...alertBox,
      open: false,
    });
    if (actionFlag && alertBox.mode === "package") {
      // Package check is not needed second time
      setPkgCheck(false);
      setOpen(true);
    } else if (actionFlag && alertBox.mode === "shipment") {
      // Dispatch the shipment job
      dispatch(sendShipment({ po_number: order.orderDetail.orders.po_number }));
    } else if (actionFlag && alertBox.mode === "invoice") {
      // Dispatch the invoice job
      dispatch(sendInvoice({ po_number: order.orderDetail.orders.po_number }));
    } else if (actionFlag && alertBox.mode === "manual") {
      // Dispatch the action to mark order as manual
      const payload = { po_number: order.orderDetail.orders.po_number };
      dispatch(markOrderManual(payload));
    } else if (actionFlag && alertBox.mode === "tracking") {
      // Open the dialog box to add tracking no
      setTrackingDialogOpen(true);
    } else if (actionFlag && alertBox.mode === "odoo") {
      const payload = { po_number: order.orderDetail.orders.po_number };
      dispatch(addOdoo(payload));
    } else if (actionFlag && alertBox.mode === "label") {
      const payload = { po_number: order.orderDetail.orders.po_number };
      dispatch(createLabel(payload));
    }
  };

  const handleDeletePkg = (pkgInfo) => {
    // Do not delete the package if order status is shipped
    if (
      ["SLC", "OC", "SH", "IS", "OF"].includes(order.orderDetail.orders.status)
    ) {
      setAlertMsg("Packages cannot be deleted for this PO");
    } else {
      // Dispatching the action to delete the pkg
      const payload = { package_id: pkgInfo.id };
      dispatch(deletePackage(payload));
    }
  };

  const handlePkgSubmit = (pkgInfo) => {
    const pkgInp = {
      partner_id: order.orderDetail.orders.partner_id,
      po_number: order.orderDetail.orders.po_number,
      so_number: order.orderDetail.orders.so_number,
      sku: pkgInfo.pkgInput.map((item) => item.sku).join(","),
      qty: pkgInfo.pkgInput.map((item) => item.quantity).join(","),
      length: pkgInfo.dimensions.length,
      width: pkgInfo.dimensions.width,
      height: pkgInfo.dimensions.height,
      weight: pkgInfo.dimensions.weight,
      tracking_number: null,
      ship_type: pkgInfo.isLtl ? "LTL" : "small_parcel",
    };
    if (hasEmptyOrUndefined(pkgInp)) {
      setAlertMsg("Cannot have empty values");
    } else {
      dispatch(addPackage(pkgInp));
      handleClose();
    }
  };

  const hasUndefinedOrEmptyString = (arrayOfObjects) => {
    // Loop through each object in the array
    for (let obj of arrayOfObjects) {
      // Loop through each key in the object
      for (let key in obj) {
        const value = obj[key];
        // Check if the value is null, undefined, or an empty string
        if (value === null || value === undefined || value === "") {
          return true;
        }
      }
    }
    // If no keys are empty, null, or undefined, return true
    return false;
  };

  const handleTrackingSubmit = (trackings) => {
    if (hasUndefinedOrEmptyString(trackings)) {
      setAlertMsg("Enter all informations");
    }
    const trackingInp = {
      partner_id: order.orderDetail.orders.partner_id,
      po_number: order.orderDetail.orders.po_number,
      so_number: order.orderDetail.orders.so_number,
      seller_partner_id: "S1",
      pkg_info: trackings,
    };
    dispatch(updateTrackingInfo(trackingInp));
    handleTrackingClose();
  };

  // ---- Label Viewer ----
  const handleViewLabels = async (poNum) => {
    if (!poNum) return;

    setCurrentPo(poNum);
    setLabelLoading(true);
    setPdfUrl(null);

    try {
      // Whatever the thunk returns (Blob, axios response, RTK action)
      const result = await dispatch(getLabel({ po_number: poNum }));

      let blob = null;

      // 1) If thunk directly returns a Blob
      if (result instanceof Blob) {
        blob = result;
      }
      // 2) If thunk returns axios response { data, headers }
      else if (result && result.data) {
        const contentType =
          result.headers?.["content-type"] || "application/pdf";
        blob = new Blob([result.data], { type: contentType });
      }
      // 3) If using RTK-style { payload }
      else if (result && result.payload) {
        if (result.payload instanceof Blob) {
          blob = result.payload;
        } else if (result.payload.data) {
          const contentType =
            result.payload.headers?.["content-type"] || "application/pdf";
          blob = new Blob([result.payload.data], { type: contentType });
        }
      }

      if (!blob) {
        setAlertMsg("Unable to load label");
        return;
      }

      const objectUrl = URL.createObjectURL(blob);
      setPdfUrl(objectUrl);
      setLabelDialogOpen(true);
    } catch (e) {
      console.error("Error loading label", e);
      setAlertMsg("Error loading label");
    } finally {
      setLabelLoading(false);
    }
  };

  const handleCloseLabelDialog = () => {
    setLabelDialogOpen(false);
  };

  const handleDownload = () => {
    if (!pdfUrl) return;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `label-${currentPo || "label"}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    dispatch(getOrderDetails(poNumber));
  }, [dispatch, poNumber]);

  useEffect(() => {
    if (poNumber) {
      dispatch(getActivities(poNumber));
    }
  }, [dispatch, poNumber]);

  return (
    <div className="znect__orderdetail-container">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={order.isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {order.orderDetail ? (
        <>
          <div className="znect__orderdetail-control">
            <button onClick={goBack}>
              <CustomArrowBackIcon />
            </button>
            <div className="znect__orderdetail-control__text">
              <p>Order/Order Details</p>
              <h4>Order# {order.orderDetail.orders.id}</h4>
            </div>
          </div>
          <div className="znect__orderdetail-header">
            <div className="znect__orderdetail-header__main">
              <div className="znect__orderdetail-header__main-text">
                <h4>Order PO# {order.orderDetail.orders.po_number}</h4>
                <div className="green_chip">
                  {getStatus(order.orderDetail.orders.status)}
                </div>
              </div>
              <div className="znect__orderdetail-header__main-control">
                <button onClick={handleMenuClick}>More</button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={menuOpen}
                  onClose={handleMenuClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {order.orderDetail.orders.status === "MP" && (
                    <MenuItem onClick={() => handleMenuClose("tracking")}>
                      Update Tracking
                    </MenuItem>
                  )}
                  {["IC", "ET"].includes(order.orderDetail.orders.status) && (
                    <>
                      <MenuItem onClick={() => handleMenuClose("manual")}>
                        Mark Manual
                      </MenuItem>
                    </>
                  )}
                  {order.orderDetail.orders.status === "SLC" && (
                    <MenuItem onClick={() => handleMenuClose("shipment")}>
                      Send Shipment
                    </MenuItem>
                  )}
                  {order.orderDetail.orders.status === "SH" && (
                    <MenuItem onClick={() => handleMenuClose("odoo")}>
                      Add to Odoo
                    </MenuItem>
                  )}
                  {order.orderDetail.orders.status === "SH" && (
                    <MenuItem onClick={() => handleMenuClose("invoice")}>
                      Send Invoice
                    </MenuItem>
                  )}

                  <MenuItem onClick={() => handleMenuClose("delete")}>
                    Delete
                  </MenuItem>
                </Menu>
                {["ET", "IC", "MP", "SLN"].includes(
                  order.orderDetail.orders.status
                ) ? (
                  <button onClick={handleLabelGen} className="gradient_bg">
                    Create Shipping Label
                  </button>
                ) : null}

                <InputTrackingDialog
                  open={trackingDialogOpen}
                  handleClose={handleTrackingClose}
                  handleSubmit={(trackings) => {
                    handleTrackingSubmit(trackings);
                  }}
                  items={
                    order.orderDetail.package_info
                      ? order.orderDetail.package_info
                      : []
                  }
                />
              </div>
            </div>
            <div className="znect__orderdetail-header__info">
              <div className="znect__orderdetail-header__chips">
                Order Timestamp:{" "}
                {formatTimestamp(order.orderDetail.orders.po_date)}
              </div>
              <div className="znect__orderdetail-header__chips">
                Partner: {getPartnerName(order.orderDetail.orders.partner_id)}
              </div>
            </div>
          </div>
          <div className="znect__orderdetail__history-container">
            <h3>Status Timeline</h3>

            <div className="znect__orderdetail-header__status-history">
              {order.orderDetail.status_history?.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="znect__orderdetail-header__status-history__el">
                    <p>{item.status}</p>
                    <p>{convertToTime(item.timestamp)}</p>
                  </div>
                  {index < order.orderDetail.status_history.length - 1 && (
                    <div className="dotted-line"></div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Shipping Label Viewer Button */}
            <Button
              variant="outlined"
              startIcon={<LocalShippingIcon />}
              sx={{ mt: 2, borderRadius: "8px" }}
              onClick={() =>
                handleViewLabels(order.orderDetail.orders.po_number)
              }
            >
              Shipping Label
            </Button>
          </div>

          <div className="znect__orderdetail__custaddress-container">
            <div className="znect__custaddress-blocks">
              <h3>Customer & Order</h3>
              <div className="znect__custaddress-blocks__content">
                <h4>Name:</h4>
                <p>
                  {order.orderDetail.address_info.shipping.first_name}{" "}
                  {order.orderDetail.address_info.shipping.last_name}
                </p>
              </div>
              <div className="znect__custaddress-blocks__content">
                <h4>Email:</h4>
                <p>
                  {order.orderDetail.address_info.shipping.email
                    ? order.orderDetail.address_info.shipping.email
                    : "Not available"}
                </p>
              </div>
              <div className="znect__custaddress-blocks__content">
                <h4>Phone:</h4>
                <p>
                  {order.orderDetail.address_info.shipping.phone
                    ? order.orderDetail.address_info.shipping.phone
                    : "Not available"}
                </p>
              </div>
              <div className="znect__custaddress-blocks__content">
                <h4>Carrier Code:</h4>
                <p>{order.orderDetail.orders.shipment_carrier}</p>
              </div>
              <div className="znect__custaddress-blocks__content">
                <h4>Delivery Method:</h4>
                <p>{order.orderDetail.orders.shipment_priority}</p>
              </div>
            </div>
            <div className="znect__custaddress-blocks">
              <h3>Shipping Address</h3>
              <div className="znect__custaddress-blocks__content">
                <p>{formatAddress(order.orderDetail.address_info.shipping)}</p>
              </div>
            </div>
            <div className="znect__custaddress-blocks">
              <h3>Billing Address</h3>
              <div className="znect__custaddress-blocks__content">
                <p>{formatAddress(order.orderDetail.address_info.billing)}</p>
              </div>
            </div>
          </div>
          <div className="znect__orderdetail__item-container">
            <h4>Items Ordered</h4>
            {order.orderDetail.item_info ? (
              <ItemTable
                data={order.orderDetail.item_info}
                shippingFees={order.orderDetail.total_cost}
              />
            ) : (
              <div>No Items Found</div>
            )}
          </div>
          <div className="znect__orderdetail__item-container">
            <h4>Activities</h4>
            {order.isLoading ? (
              <p>Loading activities...</p>
            ) : order.error ? (
              <p>Error loading activities: {order.error}</p>
            ) : !order.activities ||
              !order.activities.data ||
              order.activities.data.length === 0 ? (
              <p>No activities</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Activity</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {order.activities.data.map((activity, index) => (
                    <tr key={index}>
                      <td>
                        <strong>{activity.user_name}</strong>
                      </td>
                      <td>{activity.activity}</td>
                      <td>{formatTimestamp(activity.timestamp)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="znect__orderdetail__package-container">
            <div className="znect__orderdetail__package-header">
              <h4>Packages</h4>
              <button onClick={handlePkgDialog}>Add</button>
              <AlertDialog
                title={alertBox.title}
                body={alertBox.body}
                open={alertBox.open}
                handleAction={(actionFlag) => {
                  handleAlertDialog(actionFlag);
                }}
              />
              <PackageDialog
                open={open}
                handleClose={() => {
                  handleClose();
                }}
                handleSubmit={(pkgInfo) => {
                  handlePkgSubmit(pkgInfo);
                }}
                items={order.orderDetail.item_info}
              />
            </div>
            {order.orderDetail.package_info ? (
              order.orderDetail.package_info.map((item, index) => (
                <div
                  key={index}
                  className="znect__orderdetail__package-header__content"
                >
                  <div className="znect__orderdetail__package-header__content__action">
                    <h5>Package {index + 1}</h5>
                    {item.tracking_number ? (
                      <>
                        <button style={{ display: "none" }}>
                          Reprint Label
                        </button>
                        <button style={{ display: "none" }}>
                          Cancel Purchased Shipping Label
                        </button>
                      </>
                    ) : null}
                    <button
                      onClick={() => {
                        handleDeletePkg(item);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                  <div className="znect__orderdetail__package-header__content__carrier">
                    <div className="znect__orderdetail__package-header__content__carrier-detail">
                      <p>
                        <span style={{ fontWeight: "600" }}>Ship Date:</span>
                        <span style={{ marginLeft: "10px" }}>None</span>
                      </p>
                      <p>
                        <span style={{ fontWeight: "600" }}>Carrier:</span>{" "}
                        <span style={{ marginLeft: "10px" }}>
                          {item.ca ? item.priority : "None"}
                        </span>
                      </p>
                      <p>
                        <span style={{ fontWeight: "600" }}>
                          Shipping Service:
                        </span>
                        <span style={{ marginLeft: "10px" }}>
                          {item.priority ? item.priority : "None"}
                        </span>
                      </p>
                    </div>
                    <div className="znect__orderdetail__package-header__content__tracking-detail">
                      <p>
                        <span style={{ fontWeight: "600" }}>Tracking No:</span>
                        <span style={{ marginLeft: "10px" }}>
                          {item.tracking_number ? item.tracking_number : "None"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="znect__orderdetail__package-header__content__pkg">
                    <h5 style={{ flexGrow: "1" }}>Package Information</h5>
                    <div style={{ flexGrow: "1" }}>
                      <p>
                        <span style={{ fontWeight: "600" }}>SKUs:</span>
                        <span style={{ marginLeft: "10px" }}>{item.sku}</span>
                      </p>
                      <p>
                        <span style={{ fontWeight: "600" }}>
                          Dimensions (LWH):
                        </span>
                        <span style={{ marginLeft: "10px" }}>
                          {item.length ? item.length : "None"} x{" "}
                          {item.width ? item.width : "None"} x{" "}
                          {item.height ? item.height : "None"} IN
                        </span>
                      </p>
                      <p>
                        <span style={{ fontWeight: "600" }}>
                          Package Weight:
                        </span>
                        <span style={{ marginLeft: "10px" }}>
                          {item.weight ? item.weight : "None"} LBS
                        </span>
                      </p>
                    </div>
                    <div style={{ flexGrow: "2" }}>
                      <p>
                        <span style={{ fontWeight: "600" }}>Quantities:</span>
                        <span style={{ marginLeft: "10px" }}>
                          {item.quantity}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="znect__default">
                No Package Information Available
              </div>
            )}
          </div>
        </>
      ) : order.isLoading === false ? (
        <EmptyState />
      ) : null}

      {/* Label Preview Dialog */}
      <Dialog
        open={labelDialogOpen}
        onClose={handleCloseLabelDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Shipping Label {currentPo ? `- ${currentPo}` : ""}
        </DialogTitle>
        <DialogContent dividers sx={{ height: "70vh" }}>
          {labelLoading && !pdfUrl ? (
            <div
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </div>
          ) : pdfUrl ? (
            <iframe
              title="Shipping Label Preview"
              src={pdfUrl}
              style={{ width: "100%", height: "100%", border: "none" }}
            />
          ) : (
            <p>No label to display.</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            startIcon={<PictureAsPdfIcon />}
            onClick={handleDownload}
            disabled={!pdfUrl}
          >
            Download
          </Button>
          <Button onClick={handleCloseLabelDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      <AlertSnackBar
        severity={order.errorSeverity}
        open={
          Boolean(alertMsg) ||
          Boolean(order.errorMsg) ||
          Boolean(order.successMsg)
        }
        msg={
          alertMsg
            ? alertMsg
            : order.errorMsg
            ? order.errorMsg
            : order.successMsg
        }
        handleAlertClose={() => handleAlertClose()}
      />
    </div>
  );
};

export default OrderDetails;
