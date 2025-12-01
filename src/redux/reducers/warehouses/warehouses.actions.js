import actionTypes from "./warehouses.actionTypes";

const fetchStart = () => ({
  type: actionTypes.FETCH_START,
});

const fetchWarehouseSuccess = (warehouses) => ({
  type: actionTypes.FETCH_WAREHOUSE_SUCCESS,
  payload: warehouses,
});

const actionFailed = (errorMsg) => ({
  type: actionTypes.FAIL_ACTION,
  payload: errorMsg,
});

const filterWarehouses = (warehouses) => ({
  type: actionTypes.FILTER_WAREHOUSES,
  payload: warehouses,
});

const clearWarehouseDetail = () => ({
  type: actionTypes.CLEAR_WAREHOUSE_DETAIL,
});

const warehouseDetail = (warehouseId) => ({
  type: actionTypes.WAREHOUSE_DETAIL,
  payload: warehouseId,
});

const addWarehouse = (warehouseData) => ({
  type: actionTypes.ADD_WAREHOUSE,
  payload: warehouseData,
});

const clearAlert = () => ({
  type: actionTypes.CLEAR_ALERT,
});

const updateWarehouse = (warehouseData) => ({
  type: actionTypes.UPDATE_WAREHOUSE,
  payload: warehouseData,
});

const deleteWarehouseMapping = (mappingData) => ({
  type: actionTypes.DELETE_WAREHOUSE_MAPPING,
  payload: mappingData,
});

const addWarehouseMapping = (mappingData) => ({
  type: actionTypes.ADD_WAREHOUSE_MAPPING,
  payload: mappingData,
});

const deleteWarehouse = (warehouse) => ({
  type: actionTypes.DELETE_WAREHOUSE,
  payload: warehouse,
});

export default {
  fetchStart,
  fetchWarehouseSuccess,
  actionFailed,
  filterWarehouses,
  clearWarehouseDetail,
  warehouseDetail,
  addWarehouse,
  clearAlert,
  updateWarehouse,
  deleteWarehouseMapping,
  addWarehouseMapping,
  deleteWarehouse,
};
