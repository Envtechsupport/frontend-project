import { type } from "@testing-library/user-event/dist/type";
import actionTypes from "./order.actionTypes";

const orderFetchStart = () => ({
  type: actionTypes.FETCH_ORDERS_START,
});

const orderFetchSucess = (orders,  total) => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  payload: { orders, total },
});

const orderFetchFail = (error) => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  payload: error,
});

const filterOrders = (orders) => ({
  type: actionTypes.FILTER_ORDERS,
  payload: orders,
});

const fetchOrderDetails = (orderDetail) => ({
  type: actionTypes.FETCH_ORDER_DETAIL,
  payload: orderDetail,
});

const clearOrderDetails = () => ({
  type: actionTypes.CLEAR_ORDER_DETAIL,
});

const addPackage = (packageInfo) => ({
  type: actionTypes.ADD_PACKAGE,
  payload: packageInfo,
});

const getShippingDimensions = (skuDetails) => ({
  type: actionTypes.SHIPPING_DIMENSIONS,
  payload: skuDetails,
});

const deletePackage = (pkgInfo) => ({
  type: actionTypes.DELETE_PACKAGE,
  payload: pkgInfo,
});

const markOrderManual = (orderInfo) => ({
  type: actionTypes.MARK_MANUAL,
  payload: orderInfo,
});

const updateTrackingInfo = (trackingInfo) => ({
  type: actionTypes.TRACKING_UPDATE,
  payload: trackingInfo,
});

const uploadOrderFile = () => ({
  type: actionTypes.UPLOAD_ORDER,
});

const reprocessOrder = (response) => ({
  type: actionTypes.REPROCESS_ORDER,
  payload: response,
});

const clearAlert = () => ({
  type: actionTypes.CLEAR_ALERT,
});

const sendShipment = (response) => ({
  type: actionTypes.SEND_SHIPMENT,
  payload: response,
});

const sendInvoice = (response) => ({
  type: actionTypes.SEND_INVOICE,
  payload: response,
});

const addOdoo = (response) => ({
  type: actionTypes.ADD_ODOO,
  payload: response,
});

const createLabel = (orderInfo) => ({
  type: actionTypes.CREATE_LABEL,
  payload: orderInfo,
});

const getLabel = (labels) => ({
  type: actionTypes.GET_LABEL_SUCCESS,
  payload: labels,
});

const fetchActivitiesStart = () => ({
  type: actionTypes.FETCH_ACTIVITIES_START,
});
const fetchActivitiesSuccess = (activities) => ({
  type: actionTypes.FETCH_ACTIVITIES_SUCCESS,
  payload: activities,
});
const fetchActivitiesFail = (error) => ({
  type: actionTypes.FETCH_ACTIVITIES_FAIL,
  payload: error,
});

export default {
  orderFetchFail,
  orderFetchStart,
  orderFetchSucess,
  filterOrders,
  fetchOrderDetails,
  clearOrderDetails,
  addPackage,
  getShippingDimensions,
  deletePackage,
  markOrderManual,
  updateTrackingInfo,
  uploadOrderFile,
  reprocessOrder,
  clearAlert,
  sendShipment,
  sendInvoice,
  addOdoo,
  createLabel,
  fetchActivitiesStart,    
  fetchActivitiesSuccess,  
  fetchActivitiesFail,
  getLabel,
};
