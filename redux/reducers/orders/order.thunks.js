import OrderService from "../../../services/order.service";
import actions from "./order.actions";

export const getOrders = (page, pageSize) => async (dispatch) => {
  dispatch(actions.orderFetchStart());
  OrderService.getOrders(page, pageSize)
    .then((response) => {
      dispatch(actions.orderFetchSucess(response.orders, response.total));
      dispatch(actions.filterOrders(response.orders));
    })
    .catch((error) => {
      dispatch(actions.orderFetchFail(error.message));
    });
};

export const searchOrderByPONumber = (poNumber) => async (dispatch) => {
  dispatch(actions.orderFetchStart()); // Dispatch an action to indicate fetching has started
  try {
    const response = await OrderService.searchOrderByPONumber(poNumber); // Call your API service
    dispatch(actions.orderFetchSucess(response.orders, 1));
    dispatch(actions.filterOrders(response.orders)); // Dispatch success action with the received response
  } catch (error) {
    dispatch(actions.orderFetchFail(error.message)); // Dispatch fail action with error message
  }
};
export const searchOrdersByDate = (orderDate) => async (dispatch) => {
  dispatch(actions.orderFetchStart()); // Dispatch an action to indicate fetching has started
  try {
    const response = await OrderService.searchOrdersByDate(orderDate); // Call the API service for orders by date
    dispatch(actions.orderFetchSucess(response.orders, response.totalOrders)); // Dispatch success action with the received orders and page number
    dispatch(actions.filterOrders(response.orders)); // Filter the orders after successful fetch
  } catch (error) {
    dispatch(actions.orderFetchFail(error.message)); // Dispatch fail action with error message
  }
};
export const searchOrderByStatus = (statusDescription) => async (dispatch) => {
  dispatch(actions.orderFetchStart()); // Dispatch an action to indicate fetching has started
  try {
    const response = await OrderService.searchOrderByStatus(statusDescription); // Call your API service
    
    // Assuming response contains { orders: [...], totalOrders: number }
    dispatch(actions.orderFetchSucess(response.orders, response.totalOrders)); // Dispatch success action with the received response
    dispatch(actions.filterOrders(response.orders)); // Optionally dispatch a filter action if needed
  } catch (error) {
    dispatch(actions.orderFetchFail(error.message)); // Dispatch fail action with error message
  }
};

export const getOrderDetails = (poNumber) => async (dispatch) => {
  dispatch(actions.orderFetchStart());
  OrderService.getOrderDetails(poNumber)
    .then((response) => {
      dispatch(actions.fetchOrderDetails(response));
    })
    .catch((error) => {
      dispatch(actions.orderFetchFail(error.message));
    });
};

export const markOrderManual = (orderInfo) => async (dispatch) => {
  dispatch(actions.orderFetchStart());
  OrderService.markOrderManual(orderInfo)
    .then((response) => {
      dispatch(actions.markOrderManual(orderInfo));
    })
    .catch((error) => {
      dispatch(actions.orderFetchFail(error.message));
    });
};

export const addPackage = (pkgInfo) => async (dispatch) => {
  dispatch(actions.orderFetchStart());
  OrderService.addPackage(pkgInfo)
    .then((response) => {
      const resLength = response.payload.length;
      dispatch(actions.addPackage(response.payload[resLength - 1]));
    })
    .catch((error) => {
      dispatch(actions.orderFetchFail(error.message));
    });
};

export const deletePackage = (pkgInfo) => async (dispatch) => {
  dispatch(actions.orderFetchStart());
  OrderService.deletePackage(pkgInfo)
    .then((response) => {
      dispatch(actions.deletePackage(pkgInfo));
    })
    .catch((error) => {
      dispatch(actions.orderFetchFail(error.message));
    });
};

export const updateTrackingInfo = (trackingInfo) => async (dispatch) => {
  dispatch(actions.orderFetchStart());
  OrderService.updateTrackingInfo(trackingInfo)
    .then((response) => {
      dispatch(actions.updateTrackingInfo(trackingInfo));
    })
    .catch((error) => {
      dispatch(actions.orderFetchFail(error.message));
    });
};

export const uploadOrderFile = (formData) => async (dispatch) => {
  dispatch(actions.orderFetchStart());
  OrderService.uploadOrderFile(formData)
    .then((response) => {
      dispatch(actions.uploadOrderFile());
    })
    .catch((error) => {
      dispatch(actions.orderFetchFail(error.message));
    });
};

export const reprocessOrder = (orderInfo) => async (dispatch) => {
  dispatch(actions.orderFetchStart());
  OrderService.reprocessOrder(orderInfo)
    .then((response) => {
      dispatch(actions.reprocessOrder(response));
    })
    .catch((error) => {
      dispatch(actions.orderFetchFail(error.message));
    });
};

export const sendShipment = (orderInfo) => async (dispatch) => {
  dispatch(actions.orderFetchStart());
  OrderService.sendShipment(orderInfo)
    .then((response) => {
      dispatch(actions.sendShipment(response));
    })
    .catch((error) => {
      dispatch(actions.orderFetchFail(error.message));
    });
};

export const sendInvoice = (orderInfo) => async (dispatch) => {
  dispatch(actions.orderFetchStart());
  OrderService.sendInvoice(orderInfo)
    .then((response) => {
      dispatch(actions.sendInvoice(response));
    })
    .catch((error) => {
      dispatch(actions.orderFetchFail(error.message));
    });
};

export const addOdoo = (orderInfo) => async (dispatch) => {
  dispatch(actions.orderFetchStart());
  OrderService.addOdoo(orderInfo)
    .then((response) => {
      dispatch(actions.addOdoo(response));
    })
    .catch((error) => {
      dispatch(actions.orderFetchFail(error.message));
    });
};

export const shipping_dimensions = (skuDetails) => async (dispatch) => {
  dispatch(actions.orderFetchStart()); // Dispatch start action to indicate loading

  try {
    const response = await OrderService.getShippingDimensions(skuDetails); // Await the service call
    dispatch(actions.getShippingDimensions(response));
    return response; // Dispatch success action with the response data
  } catch (error) {
    dispatch(actions.orderFetchFail(error.message)); // Dispatch failure action with the error message
  }
};

export const getActivities = (identifier) => async (dispatch) => {
  dispatch(actions.fetchActivitiesStart());
  try {
    const response = await OrderService.getActivities(identifier);
    dispatch(actions.fetchActivitiesSuccess(response));
  } catch (error) {
    dispatch(actions.fetchActivitiesFail(error.message));
  }
};

export const createLabel = (orderInfo) => async (dispatch) => {
  dispatch(actions.orderFetchStart());
  OrderService.createLabel(orderInfo)
    .then((response) => {
      dispatch(actions.createLabel(orderInfo));
    })
    .catch((error) => {
      dispatch(actions.orderFetchFail(error.message));
    });
};

export const getLabel = (po_number) => async (dispatch) => {
  dispatch(actions.orderFetchStart());
  try {
    const response = OrderService.getLabel(po_number); // ⬅️ blob here
    // You can still dispatch something to update state if you want
    dispatch(actions.getLabel(response)); // or actions.getLabelSuccess()

    return response; // ⬅️ THIS is what handleViewLabels will receive
  } catch (error) {
    dispatch(actions.orderFetchFail(error.message));
    throw error; // so caller can catch if needed
  }
};
