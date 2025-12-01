import initialStates from "./warehouses.initialStates";
import actionTypes from "./warehouses.actionTypes";

const warehousesReducer = (state = initialStates, action) => {
  switch (action.type) {
    case actionTypes.FETCH_START:
      return {
        ...state,
        isLoading: true,
        errorMsg: null,
      };
    case actionTypes.FETCH_WAREHOUSE_SUCCESS:
      return {
        ...state,
        warehouses: action.payload,
        isLoading: false,
        errorMsg: null,
      };
    case actionTypes.FAIL_ACTION:
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
        errorSeverity: "error",
      };
    case actionTypes.FILTER_WAREHOUSES:
      return {
        ...state,
        filterWarehouses: action.payload,
        errorMsg: null,
      };
    case actionTypes.CLEAR_WAREHOUSE_DETAIL:
      return {
        ...state,
        warehouseDetail: null,
        errorMsg: null,
      };
    case actionTypes.WAREHOUSE_DETAIL:
      const warehouseDetail = state.warehouses.filter(
        (item) => item.warehouse_id === action.payload
      );
      return {
        ...state,
        warehouseDetail: warehouseDetail[0],
        isLoading: false,
        errorMsg: null,
      };
    case actionTypes.ADD_WAREHOUSE:
      return {
        ...state,
        isLoading: false,
        warehouses: [
          ...state.warehouses,
          { ...action.payload, warehouse_mapping: null },
        ],
        filterWarehouses: [
          ...state.filterWarehouses,
          { ...action.payload, warehouse_mapping: null },
        ],
        errorMsg: null,
        successMsg: "Warehouse Added Successfully",
        errorSeverity: "success",
      };
    case actionTypes.CLEAR_ALERT:
      return {
        ...state,
        errorMsg: null,
        successMsg: null,
      };
    case actionTypes.UPDATE_WAREHOUSE:
      const newWHList = state.warehouses.map((item) => {
        if (item.warehouse_id === action.payload.warehouse_id) {
          return { ...item, ...action.payload };
        }
        return item;
      });

      const newWHFilterList = state.filterWarehouses.map((item) => {
        const mainWH = newWHList.find(
          (mainItem) => mainItem.warehouse_id === item.warehouse_id
        );
        return mainWH ? { ...item, ...mainWH } : item;
      });

      return {
        ...state,
        isLoading: false,
        warehouseDetail: {
          ...state.warehouseDetail,
          ...action.payload,
        },
        warhouses: newWHList,
        filterWarehouses: newWHFilterList,
        errorMsg: null,
        successMsg: "Warehouse Updated Successfully",
        errorSeverity: "success",
      };
    case actionTypes.DELETE_WAREHOUSE_MAPPING:
      const delMapWH = state.warehouses.map((warehouse) => {
        if (warehouse.warehouse_id === action.payload.warehouse_id) {
          return {
            ...warehouse,
            warehouse_mapping: warehouse.warehouse_mapping.filter(
              (mapping) =>
                mapping.buyer_partner_id !== action.payload.buyer_partner_id
            ),
          };
        }
        return warehouse;
      });

      const delFilterMapWH = state.filterWarehouses.map((filterWH) => {
        const mainDelMapWH = delMapWH.find(
          (delMapWH) => delMapWH.warehouse_id === filterWH.warehouse_id
        );
        return mainDelMapWH ? { ...filterWH, ...mainDelMapWH } : filterWH;
      });

      const delWHDetailsMap = state.warehouseDetail.warehouse_mapping.filter(
        (whDetail) =>
          whDetail.buyer_partner_id !== action.payload.buyer_partner_id
      );

      return {
        ...state,
        warehouseDetail: {
          ...state.warehouseDetail,
          warehouse_mapping: delWHDetailsMap,
        },
        warehouses: delMapWH,
        filterWarehouses: delFilterMapWH,
        errorMsg: null,
        isLoading: false,
        successMsg: "Mapping Deleted Successfully",
        errorSeverity: "success",
      };
    case actionTypes.ADD_WAREHOUSE_MAPPING:
      const newWHMapList = state.warehouses.map((newWh) => {
        if (newWh.warehouse_id === action.payload.warehouse_id) {
          return {
            ...newWh,
            warehouse_mapping: newWh.warehouse_mapping
              ? [...newWh.warehouse_mapping, ...action.payload.mappings]
              : [...action.payload.mappings],
          };
        }
        return newWh;
      });

      const newWHFiltList = state.filterWarehouses.map((newFiltWh) => {
        const mainNewWhMap = newWHMapList.find(
          (newWHMap) => newWHMap.warehouse_id === newFiltWh.warehouse_id
        );
        return mainNewWhMap ? { ...newFiltWh, ...mainNewWhMap } : newFiltWh;
      });

      return {
        ...state,
        warehouseDetail: {
          ...state.warehouseDetail,
          warehouse_mapping: state.warehouseDetail.warehouse_mapping
            ? [
                ...state.warehouseDetail.warehouse_mapping,
                ...action.payload.mappings,
              ]
            : [...action.payload.mappings],
        },
        warehouses: newWHMapList,
        filterWarehouses: newWHFiltList,
        errorMsg: null,
        isLoading: false,
        successMsg: "Mapping Added Successfully",
        errorSeverity: "success",
      };
    case actionTypes.DELETE_WAREHOUSE:
      const remWarehouses = state.warehouses.filter(
        (warehouse) => warehouse.warehouse_id !== action.payload.warehouse_id
      );
      const remFilterWarehouses = state.filterWarehouses.filter(
        (filtWarehouse) =>
          filtWarehouse.warehouse_id !== action.payload.warehouse_id
      );

      return {
        ...state,
        warehouses: remWarehouses,
        filterWarehouses: remFilterWarehouses,
        errorMsg: null,
        isLoading: false,
        successMsg: "Warehouse Deleted Successfully",
        errorSeverity: "success",
      };
    default:
      return {
        ...state,
      };
  }
};

export default warehousesReducer;
