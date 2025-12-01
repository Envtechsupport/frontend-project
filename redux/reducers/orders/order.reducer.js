import initialStates from "./order.initialStates";
import actionTypes from "./order.actionTypes";

const orderReducer = (state = initialStates, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        isLoading: true,
        errorMsg: null,
      };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orderList: action.payload.orders,
        total: action.payload.total,
        isLoading: false,
        errorMsg: null,
      };
    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
      };
    case actionTypes.FILTER_ORDERS:
      return {
        ...state,
        filterOrders: action.payload,
        errorMsg: null,
      };
    case actionTypes.FETCH_ORDER_DETAIL:
      return {
        ...state,
        orderDetail: action.payload,
        errorMsg: null,
        isLoading: false,
      };
    case actionTypes.CLEAR_ORDER_DETAIL:
      return {
        ...state,
        orderDetail: null,
        errorMsg: null,
      };
    case actionTypes.ADD_PACKAGE:
      return {
        ...state,
        orderDetail: {
          ...state.orderDetail,
          package_info: state.orderDetail.package_info
            ? [...state.orderDetail.package_info, action.payload]
            : [action.payload],
        },
        isLoading: false,
      };
    case actionTypes.DELETE_PACKAGE:
      let new_package = state.orderDetail.package_info.filter(
        (item) => item.id !== action.payload.package_id
      );
      return {
        ...state,
        orderDetail: {
          ...state.orderDetail,
          package_info: new_package.length === 0 ? null : new_package,
        },
        isLoading: false,
      };
    case actionTypes.MARK_MANUAL:
      const newOrderList = state.orderList.map((order) => {
        if (order.customer_po === action.payload.po_number) {
          return {
            ...order,
            status: "Manual",
          };
        }
        return order;
      });
      const newFilterOrderList = state.filterOrders.map((filterOrder) => {
        const mainNewOrder = newOrderList.find(
          (newOrd) => newOrd.customer_po === filterOrder.customer_po
        );
        return mainNewOrder ? { ...filterOrder, ...mainNewOrder } : filterOrder;
      });
      return {
        ...state,
        orderList: newOrderList,
        filterOrders: newFilterOrderList,
        orderDetail: state.orderDetail
          ? {
              ...state.orderDetail,
              orders: { ...state.orderDetail.orders, status: "MP" },
            }
          : null,
        errorMsg: null,
        isLoading: false,
      };
    case actionTypes.TRACKING_UPDATE:
      const pkgInf = state.orderDetail.package_info.map((inf) => {
        const inpPkg = action.payload.pkg_info.find(
          (pk) => pk.package_id === inf.id
        );
        return {
          ...inf,
          tracking_number: inpPkg.tracking_number,
          carrier: inpPkg.carrier,
        };
      });
      return {
        ...state,
        orderDetail: {
          ...state.orderDetail,
          package_info: pkgInf,
        },
        errorMsg: null,
        isLoading: false,
      };
    case actionTypes.UPLOAD_ORDER:
      return {
        ...state,
        isLoading: false,
        errorMsg: null,
        successMsg: "Order files uploaded successfully",
        errorSeverity: "success",
      };
    case actionTypes.REPROCESS_ORDER:
      return {
        ...state,
        isLoading: false,
        errorMsg: null,
        successMsg: "Reprocess Done. Refresh Page.",
        errorSeverity: "success",
      };
    case actionTypes.SEND_SHIPMENT:
      return {
        ...state,
        isLoading: false,
        errorMsg: null,
        successMsg: "Shipment Process Done. Refresh Page.",
        errorSeverity: "success",
      };
    case actionTypes.SEND_INVOICE:
      return {
        ...state,
        isLoading: false,
        errorMsg: null,
        successMsg: "Invoice Process Done. Refresh Page.",
        errorSeverity: "success",
      };
    case actionTypes.ADD_ODOO:
      return {
        ...state,
        isLoading: false,
        errorMsg: null,
        successMsg: "Odoo Processing Done. Refresh Page.",
        errorSeverity: "success",
      };

    case actionTypes.SHIPPING_DIMENSIONS:
      return {
        ...state,
        isLoading: false,
        errorMsg: null,
        successMsg: "getting shipping details done.",
        errorSeverity: "success",
      };

    case actionTypes.CREATE_LABEL:
      return {
        ...state,
        isLoading: false,
        errorMsg: null,
        successMsg: "Label Generation Done. Refresh Page.",
        errorSeverity: "success",
      };

      case actionTypes.GET_LABEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        labels: action.payload,
      };

    // Add new action types for activities
    case actionTypes.FETCH_ACTIVITIES_START:
      return {
        ...state,
        activitiesLoading: true,
        activitiesError: null,
      };
    case actionTypes.FETCH_ACTIVITIES_SUCCESS:
      return {
        ...state,
        activities: action.payload, // Save the fetched activities
        activitiesLoading: false,
        activitiesError: null,
      };
    case actionTypes.FETCH_ACTIVITIES_FAIL:
      return {
        ...state,
        activitiesLoading: false,
        activitiesError: action.payload, // Save the error message
      };

    case actionTypes.CLEAR_ALERT:
      return {
        ...state,
        errorMsg: null,
        successMsg: null,
        errorSeverity: "error",
      };
    default:
      return {
        ...state,
      };
  }
};

export default orderReducer;
