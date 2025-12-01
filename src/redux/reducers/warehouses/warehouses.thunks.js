import WarehousesService from "../../../services/warehouses.service";
import actions from "./warehouses.actions";

export const getWarehouses = () => async (dispatch) => {
  dispatch(actions.fetchStart());
  WarehousesService.getWarehouses()
    .then((response) => {
      dispatch(actions.fetchWarehouseSuccess(response));
      dispatch(actions.filterWarehouses(response));
    })
    .catch((error) => {
      dispatch(actions.actionFailed(error.message));
    });
};

export const addWarehouse = (warehouseData) => async (dispatch) => {
  dispatch(actions.fetchStart());
  WarehousesService.addWarehouse(warehouseData)
    .then((response) => {
      dispatch(actions.addWarehouse(warehouseData));
    })
    .catch((error) => {
      dispatch(actions.actionFailed(error.message));
    });
};

export const updateWarehouse = (warehouseData) => async (dispatch) => {
  dispatch(actions.fetchStart());
  WarehousesService.addWarehouse(warehouseData)
    .then((response) => {
      dispatch(actions.updateWarehouse(warehouseData));
    })
    .catch((error) => {
      dispatch(actions.actionFailed(error.message));
    });
};

export const deleteWarehouseMapping = (mappingData) => async (dispatch) => {
  dispatch(actions.fetchStart());
  WarehousesService.deleteWarehouseMapping(mappingData)
    .then((response) => {
      dispatch(actions.deleteWarehouseMapping(mappingData));
    })
    .catch((error) => {
      dispatch(actions.actionFailed(error.message));
    });
};

export const addWarehouseMapping = (mappingData) => async (dispatch) => {
  dispatch(actions.fetchStart());
  WarehousesService.addWarehouseMapping(mappingData)
    .then((response) => {
      dispatch(actions.addWarehouseMapping(mappingData));
    })
    .catch((error) => {
      dispatch(actions.actionFailed(error.message));
    });
};

export const deleteWarehouse = (warehouse) => async (dispatch) => {
  dispatch(actions.fetchStart());
  WarehousesService.deleteWarehouse(warehouse)
    .then((response) => {
      dispatch(actions.deleteWarehouse(warehouse));
    })
    .catch((error) => {
      dispatch(actions.actionFailed(error.message));
    });
};
