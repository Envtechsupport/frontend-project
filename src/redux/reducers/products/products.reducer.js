import initialStates from "./products.initialStates";
import actionTypes from "./products.actionTypes";

const productReducer = (state = initialStates, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_START:
      return {
        ...state,
        isLoading: true,
        errorMsg: null,
      };
    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: action.payload,
        errorMsg: null,
      };
    case actionTypes.FILTER_PRODUCTS:
      return {
        ...state,
        filterProducts: action.payload,
        errorMsg: null,
      };
    case actionTypes.FETCH_PRODUCT_DETAIL:
      let prodDetail = state.products.filter(
        (prod) => prod.sku === action.payload
      );
      return {
        ...state,
        isLoading: false,
        productDetail: prodDetail[0],
        errorMsg: null,
      };
    case actionTypes.CLEAR_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: null,
        errorMsg: null,
      };
    case actionTypes.FETCH_BUYBOX_REPORT:
      return {
        ...state,
        isLoading: false,
        buyboxReport: action.payload,
        errorMsg: null,
      };
    case actionTypes.UPDATE_PRODUCT:
      const newProdList = state.products.map((prod) => {
        if (prod.sku === action.payload.sku) {
          return { ...prod, ...action.payload };
        }
        return prod;
      });

      const filterProdList = state.filterProducts.map((filtProd) => {
        const mainProd = newProdList.find(
          (mainProd) => mainProd.sku === filtProd.sku
        );
        return mainProd ? { ...filtProd, ...mainProd } : filtProd;
      });
      return {
        ...state,
        isLoading: false,
        productDetail: {
          ...state.productDetail,
          ...action.payload,
        },
        products: newProdList,
        filterProducts: filterProdList,
        errorMsg: null,
        successMsg: "Product Updated Successfully",
        errorSeverity: "success",
      };
    case actionTypes.FAIL_ACTION:
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
        errorSeverity: "error",
      };
    case actionTypes.ADD_PRODUCT:
      return {
        ...state,
        isLoading: false,
        products: [...state.products, { ...action.payload, mappings: null }],
        filterProducts: [
          ...state.filterProducts,
          { ...action.payload, mappings: null },
        ],
        errorMsg: null,
        successMsg: "Product Added Successfully",
        errorSeverity: "success",
      };
    case actionTypes.CLEAR_ALERT:
      return {
        ...state,
        errorMsg: null,
        successMsg: null,
      };
    case actionTypes.ADD_MAPPING:
      const newList = state.products.map((prod) => {
        if (prod.sku === action.payload.sku) {
          return {
            ...prod,
            mappings: prod.mappings
              ? [...prod.mappings, ...action.payload.mappings]
              : [...action.payload.mappings],
          };
        }
        return prod;
      });

      const filterList = state.filterProducts.map((filtProd) => {
        const mainPro = newList.find(
          (mainProd) => mainProd.sku === filtProd.sku
        );
        return mainPro ? { ...filtProd, ...mainPro } : filtProd;
      });

      return {
        ...state,
        productDetail: {
          ...state.productDetail,
          mappings: state.productDetail.mappings
            ? [...state.productDetail.mappings, ...action.payload.mappings]
            : [...action.payload.mappings],
        },
        products: newList,
        filterProducts: filterList,
        errorMsg: null,
        isLoading: false,
        successMsg: "Mapping Added Successfully",
        errorSeverity: "success",
      };
    case actionTypes.DELETE_MAPPING:
      const delMapProds = state.products.map((item) => {
        if (item.sku === action.payload.sku) {
          return {
            ...item,
            mappings: item.mappings.filter(
              (mapping) => mapping.partner_id !== action.payload.partner_id
            ),
          };
        }
        return item;
      });

      const delFilterList = state.filterProducts.map((filtProd) => {
        const mainDelProd = delMapProds.find(
          (mainProd) => mainProd.sku === filtProd.sku
        );
        return mainDelProd ? { ...filtProd, ...mainDelProd } : filtProd;
      });

      const delOrderDetMappings = state.productDetail.mappings.filter(
        (item) => item.partner_id !== action.payload.partner_id
      );

      return {
        ...state,
        productDetail: {
          ...state.productDetail,
          mappings: delOrderDetMappings,
        },
        products: delMapProds,
        filterProducts: delFilterList,
        errorMsg: null,
        isLoading: false,
        successMsg: "Mapping Deleted Successfully",
        errorSeverity: "success",
      };
    case actionTypes.DELETE_PRODUCT:
      const delProdList = state.products.filter(
        (prod) => prod.sku !== action.payload.sku
      );
      const filtProdList = state.filterProducts.filter(
        (filtProd) => filtProd.sku !== action.payload.sku
      );
      return {
        ...state,
        products: delProdList,
        filterProducts: filtProdList,
        errorMsg: null,
        isLoading: false,
        successMsg: "Product Deleted Successfully",
        errorSeverity: "success",
      };
    default:
      return {
        ...state,
      };
  }
};

export default productReducer;
