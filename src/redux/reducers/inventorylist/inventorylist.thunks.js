import InventoryListService from "../../../services/inventorylist.service";
import actions from "./inventorylist.actions";

export const getInventories = () => async (dispatch) => {
  dispatch(actions.fetchStart());
  InventoryListService.getInventories()
    .then((response) => {
      dispatch(actions.fetchInventory(response));
      dispatch(actions.filterInventory(response));
    })
    .catch((error) => {
      dispatch(actions.actionFailed(error.message));
    });
};

export const updateInventory = (inventoryInfo) => async (dispatch) => {
  dispatch(actions.fetchStart());
  InventoryListService.updateInventory(inventoryInfo)
    .then((response) => {
      dispatch(actions.updateInventory(inventoryInfo));
    })
    .catch((error) => {
      dispatch(actions.actionFailed(error.message));
    });
};

export const addWarehouseInventory = (inventoryInfo) => async (dispatch) => {
  dispatch(actions.fetchStart());
  InventoryListService.updateInventory(inventoryInfo)
    .then((response) => {
      dispatch(actions.addWarehouseInventory(inventoryInfo));
    })
    .catch((error) => {
      dispatch(actions.actionFailed(error.message));
    });
};

export const deleteWarehouseInventory = (inventoryInfo) => async (dispatch) => {
  dispatch(actions.fetchStart());
  InventoryListService.deleteWarehouseInventory(inventoryInfo)
    .then((response) => {
      dispatch(actions.deleteWarehouseInventory(inventoryInfo));
    })
    .catch((error) => {
      dispatch(actions.actionFailed(error.message));
    });
};

export const deleteFullInventory = (inventoryInfo) => async (dispatch) => {
  dispatch(actions.fetchStart());
  InventoryListService.deleteFullInventory(inventoryInfo)
    .then((response) => {
      dispatch(actions.deleteFullInventory(inventoryInfo));
    })
    .catch((error) => {
      dispatch(actions.actionFailed(error.message));
    });
};

export const addFullInventory = (inventoryInfo) => async (dispatch) => {
  dispatch(actions.fetchStart());
  InventoryListService.updateInventory(inventoryInfo)
    .then((response) => {
      dispatch(actions.addFullInv(inventoryInfo));
    })
    .catch((error) => {
      dispatch(actions.actionFailed(error.message));
    });
};

export const uploadInvFile = (formData) => async (dispatch) => {
  dispatch(actions.fetchStart());
  InventoryListService.uploadInvFile(formData)
    .then((response) => {
      dispatch(actions.uploadInvFileSuccess(response));
    })
    .catch((error) => {
      dispatch(actions.actionFailed(error.message));
    });
};

export const exportInv = () => async (dispatch) => {
  dispatch(actions.fetchStart());
  InventoryListService.exportInv()
    .then((response) => {
      dispatch(actions.exportInvSuccess(response));
    })
    .catch((error) => {
      dispatch(actions.actionFailed(error.message));
    });
};
