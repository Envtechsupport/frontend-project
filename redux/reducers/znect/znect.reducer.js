import initialStates from "./znect.initialStates";
import actionTypes from "./znect.actionTypes";

const znectReducer = (state = initialStates, action) => {
  switch (action.type) {
    case actionTypes.OPERATION_START:
      return {
        ...state,
        isLoading: {
          [action.payload.tag]: true,
        },
      };
    case actionTypes.OPERATION_SUCCESS:
      return {
        ...state,
        isLoading: null,
        successMsg: action.payload,
        errorSeverity: "success",
      };
    case actionTypes.AMAZON_JOB:
      return {
        ...state,
        isLoading: null,
        successMsg: action.payload,
        errorSeverity: "success",
      };
    case actionTypes.OPERATION_FAIL:
      return {
        ...state,
        isLoading: null,
        errorMsg: action.payload,
        errorSeverity: "error",
      };
    case actionTypes.CLEAR_ALERT:
      return {
        ...state,
        errorMsg: null,
        successMsg: null,
      };
    case actionTypes.SET_ERROR:
      return {
        ...state,
        errorMsg: action.payload,
        errorSeverity: "error",
      };
    default:
      return state;
  }
};

export default znectReducer;
