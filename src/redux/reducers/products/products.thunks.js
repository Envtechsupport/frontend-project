import ProductService from "../../../services/product.service";
import actions from "./products.actions";

export const getProducts = () => async (dispatch) => {
  dispatch(actions.productFetchStart());
  ProductService.getProducts()
    .then((response) => {
      dispatch(actions.productFetchSucess(response));
      dispatch(actions.filterProducts(response));
    })
    .catch((error) => {
      dispatch(actions.actionFailed(error.message));
    });
};

export const getBuyboxReport = () => async (dispatch) => {
  dispatch(actions.productFetchStart());
  ProductService.getBuyboxReport()
      .then((response) => {
        dispatch(actions.fetchBuyboxReport(response));
      })
      .catch((error) => {
        dispatch(actions.actionFailed(error.message));
      });
};

export const updateProduct = (productData) => async (dispatch) => {
  dispatch(actions.productFetchStart());
  ProductService.updateProduct(productData)
    .then((response) => {
      dispatch(actions.productUpdated(productData));
    })
    .catch((error) => {
      dispatch(actions.actionFailed(error.message));
    });
};

export const addProduct = (productData) => async (dispatch) => {
  dispatch(actions.productFetchStart());
  ProductService.updateProduct(productData)
    .then((response) => {
      dispatch(actions.addProduct(productData));
    })
    .catch((error) => {
      dispatch(actions.actionFailed(error.message));
    });
};

export const addMappings = (mappingData) => async (dispatch) => {
  dispatch(actions.productFetchStart());
  ProductService.addMappings(mappingData)
    .then((response) => {
      dispatch(actions.addMappings(mappingData));
    })
    .catch((error) => {
      dispatch(actions.actionFailed(error.message));
    });
};

export const deleteMapping = (mappingData) => async (dispatch) => {
  dispatch(actions.productFetchStart());
  ProductService.deleteMapping(mappingData)
    .then((response) => {
      dispatch(actions.deleteMapping(mappingData));
    })
    .catch((error) => {
      dispatch(actions.actionFailed(error.message));
    });
};

export const deleteProduct = (productInfo) => async (dispatch) => {
  dispatch(actions.productFetchStart());
  ProductService.deleteProduct(productInfo)
    .then((response) => {
      dispatch(actions.deleteProduct(productInfo));
    })
    .catch((error) => {
      dispatch(actions.actionFailed(error.message));
    });
};
