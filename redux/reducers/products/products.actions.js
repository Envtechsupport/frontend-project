import actionTypes from "./products.actionTypes";

const productFetchStart = () => ({
  type: actionTypes.FETCH_PRODUCTS_START,
});

const productFetchSucess = (products) => ({
  type: actionTypes.FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

const fetchBuyboxReport = (products) => ({
  type: actionTypes.FETCH_BUYBOX_REPORT,
  payload: products,
});

const filterProducts = (products) => ({
  type: actionTypes.FILTER_PRODUCTS,
  payload: products,
});

const productDetail = (sku) => ({
  type: actionTypes.FETCH_PRODUCT_DETAIL,
  payload: sku,
});

const clearProductDetail = () => ({
  type: actionTypes.CLEAR_PRODUCT_DETAIL,
});

const productUpdated = (productData) => ({
  type: actionTypes.UPDATE_PRODUCT,
  payload: productData,
});

const actionFailed = (errorMsg) => ({
  type: actionTypes.FAIL_ACTION,
  payload: errorMsg,
});

const addProduct = (prodData) => ({
  type: actionTypes.ADD_PRODUCT,
  payload: prodData,
});

const clearAlert = () => ({
  type: actionTypes.CLEAR_ALERT,
});

const addMappings = (mappingData) => ({
  type: actionTypes.ADD_MAPPING,
  payload: mappingData,
});

const deleteMapping = (mappingData) => ({
  type: actionTypes.DELETE_MAPPING,
  payload: mappingData,
});

const deleteProduct = (productInfo) => ({
  type: actionTypes.DELETE_PRODUCT,
  payload: productInfo,
});

export default {
  productFetchStart,
  productFetchSucess,
  actionFailed,
  fetchBuyboxReport,
  filterProducts,
  productDetail,
  clearProductDetail,
  productUpdated,
  addProduct,
  clearAlert,
  addMappings,
  deleteMapping,
  deleteProduct,
};
