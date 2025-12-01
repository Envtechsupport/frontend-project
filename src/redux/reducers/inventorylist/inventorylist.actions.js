import actionTypes from "./inventorylist.actionTypes";

const fetchStart = () => ({
  type: actionTypes.FETCH_START,
});

const fetchInventory = (inventories) => ({
  type: actionTypes.FETCH_INVENTORY_SUCCESS,
  payload: inventories,
});

const filterInventory = (inventories) => ({
  type: actionTypes.FILTER_INVENTORY,
  payload: inventories,
});

const actionFailed = (errorMsg) => ({
  type: actionTypes.FAIL_ACTION,
  payload: errorMsg,
});

const updateInventory = (inventoryInfo) => ({
  type: actionTypes.UPDATE_INVENTORY,
  payload: inventoryInfo,
});

const selectedInventory = (inventoryInfo) => ({
  type: actionTypes.SELECTED_INVENTORY,
  payload: inventoryInfo,
});

const addWarehouseInventory = (inventoryInfo) => ({
  type: actionTypes.ADD_WAREHOUSE_INV,
  payload: inventoryInfo,
});

const clearAlert = () => ({
  type: actionTypes.CLEAR_ALERT,
});

const deleteWarehouseInventory = (inventoryInfo) => ({
  type: actionTypes.DELETE_WAREHOUSE_INV,
  payload: inventoryInfo,
});

const deleteFullInventory = (inventoryInfo) => ({
  type: actionTypes.DELETE_FULL_INV,
  payload: inventoryInfo,
});

const addFullInv = (inventoryInfo) => ({
  type: actionTypes.ADD_FULL_INV,
  payload: inventoryInfo,
});

const uploadInvFileSuccess = (response) => ({
  type: actionTypes.UPLOAD_INV_FILE_SUCCESS,
  payload: response,
});

const exportInvSuccess = (response) => ({
  type: actionTypes.EXPORT_INV_SUCCESS,
  payload: response,
});

export default {
  fetchStart,
  fetchInventory,
  filterInventory,
  actionFailed,
  updateInventory,
  selectedInventory,
  addWarehouseInventory,
  clearAlert,
  deleteWarehouseInventory,
  deleteFullInventory,
  addFullInv,
  uploadInvFileSuccess,
  exportInvSuccess,
};
