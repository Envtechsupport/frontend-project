import initialStates from "./inventorylist.initialStates";
import actionTypes from "./inventorylist.actionTypes";
import { formatDateToUTCString } from "../../../utilities/utils";

const inventorylistReducer = (state = initialStates, action) => {
  switch (action.type) {
    case actionTypes.FETCH_START:
      return {
        ...state,
        isLoading: true,
        errorMsg: null,
      };
    case actionTypes.FETCH_INVENTORY_SUCCESS:
      return {
        ...state,
        inventories: action.payload,
        isLoading: false,
        errorMsg: null,
      };
    case actionTypes.FILTER_INVENTORY:
      return {
        ...state,
        filterInventories: action.payload,
        errorMsg: null,
      };
    case actionTypes.UPDATE_INVENTORY:
      let newWarehouseList = null;
      const newInvList = state.inventories.map((inv) => {
        if (inv.sku === action.payload.sku) {
          newWarehouseList = inv.warehouses.map((wh) => {
            if (wh.warehouse_id === action.payload.warehouses[0].warehouse_id) {
              return action.payload.warehouses[0];
            }
            return wh;
          });
          const totalQty = newWarehouseList.reduce((sum, item) => {
            return sum + Number(item.quantity);
          }, 0);
          return {
            ...inv,
            total_quantity: totalQty,
            last_updated: formatDateToUTCString(new Date()),
            warehouses: newWarehouseList,
          };
        }
        return inv;
      });
      const newFilterList = state.filterInventories.map((inv) => {
        const mainInv = newInvList.find((mainIn) => mainIn.sku === inv.sku);
        return mainInv ? mainInv : inv;
      });
      return {
        ...state,
        inventories: newInvList,
        filterInventories: newFilterList,
        selectedInventory: {
          ...state.selectedInventory,
          warehouses: newWarehouseList,
        },
        isLoading: false,
        errorMsg: null,
        successMsg: "Inventory Updated Successfully",
        errorSeverity: "success",
      };
    case actionTypes.ADD_WAREHOUSE_INV:
      const addedWHInvList = state.inventories.map((inv) => {
        if (inv.sku === action.payload.sku) {
          const newWhList = [...inv.warehouses, ...action.payload.warehouses];
          const totalQty = newWhList.reduce((sum, item) => {
            return sum + Number(item.quantity);
          }, 0);
          return {
            ...inv,
            total_quantity: totalQty,
            last_updated: formatDateToUTCString(new Date()),
            warehouses: newWhList,
          };
        }
        return inv;
      });

      const newWhInvFilterList = state.filterInventories.map((inv) => {
        const mainAddList = addedWHInvList.find(
          (mainAdInv) => mainAdInv.sku === inv.sku
        );
        return mainAddList ? mainAddList : inv;
      });

      return {
        ...state,
        inventories: addedWHInvList,
        filterInventories: newWhInvFilterList,
        selectedInventory: {
          ...state.selectedInventory,
          warehouses: [
            ...state.selectedInventory.warehouses,
            ...action.payload.warehouses,
          ],
        },
        isLoading: false,
        errorMsg: null,
        successMsg: "Inventory Added Successfully",
        errorSeverity: "success",
      };
    case actionTypes.DELETE_WAREHOUSE_INV:
      const processInventories = (inventories) => {
        return inventories.reduce((acc, inventory) => {
          if (inventory.sku === action.payload.sku) {
            const filteredWarehouses = inventory.warehouses.filter(
              (warehouse) =>
                warehouse.warehouse_id !== action.payload.warehouse_id
            );

            if (filteredWarehouses.length > 0) {
              const totalQty = filteredWarehouses.reduce((sum, item) => {
                return sum + Number(item.quantity);
              }, 0);
              acc.push({
                ...inventory,
                total_quantity: totalQty,
                last_updated: formatDateToUTCString(new Date()),
                warehouses: filteredWarehouses,
              });
            }
          } else {
            acc.push(inventory);
          }
          return acc;
        }, []);
      };

      // Process both main inventories and subInventories
      const newInventories = processInventories(state.inventories);
      const newSubInventories = processInventories(state.filterInventories);

      const newSelectWH = state.selectedInventory.warehouses.filter(
        (w) => w.warehouse_id !== action.payload.warehouse_id
      );

      return {
        ...state,
        inventories: newInventories,
        filterInventories: newSubInventories,
        selectedInventory: {
          ...state.selectedInventory,
          warehouses: newSelectWH,
        },
        isLoading: false,
        errorMsg: null,
        successMsg: "Inventory deleted successfully",
        errorSeverity: "success",
      };
    case actionTypes.DELETE_FULL_INV:
      const processDelete = (inventories) => {
        return inventories.filter((inv) => inv.sku !== action.payload.sku);
      };

      const newDeletedInvList = processDelete(state.inventories);
      const newFilDeletedList = processDelete(state.filterInventories);

      return {
        ...state,
        inventories: newDeletedInvList,
        filterInventories: newFilDeletedList,
        isLoading: false,
        errorMsg: null,
        successMsg: "Inventory deleted successfully",
        errorSeverity: "success",
      };
    case actionTypes.ADD_FULL_INV:
      const totalQty = action.payload.warehouses.reduce((sum, item) => {
        return sum + Number(item.quantity);
      }, 0);
      const newData = {
        sku: action.payload.sku,
        total_quantity: totalQty,
        last_updated: formatDateToUTCString(new Date()),
        warehouses: action.payload.warehouses,
      };

      return {
        ...state,
        inventories: [...state.inventories, newData],
        filterInventories: [...state.filterInventories, newData],
        isLoading: false,
        errorMsg: null,
        successMsg: "Inventory added successfully",
        errorSeverity: "success",
      };
    case actionTypes.SELECTED_INVENTORY:
      return {
        ...state,
        selectedInventory: action.payload,
      };
    case actionTypes.FAIL_ACTION:
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
        successMsg: null,
        errorSeverity: "error",
      };
    case actionTypes.CLEAR_ALERT:
      return {
        ...state,
        errorMsg: null,
        successMsg: null,
        errorSeverity: "error",
      };
    case actionTypes.UPLOAD_INV_FILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorMsg: null,
        successMsg: action.payload,
        errorSeverity: "success",
      };
    case actionTypes.EXPORT_INV_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorMsg: null,
        exports: action.payload,  // Store exported data
        successMsg: "Export successful",  // Success message, you can customize as needed
        errorSeverity: "success",
      };
    default:
      return state;
  }
};

export default inventorylistReducer;
