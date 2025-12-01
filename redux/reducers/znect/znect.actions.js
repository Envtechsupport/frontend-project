import actionTypes from "../znect/znect.actionTypes";

const operationStart = (operationInfo, tag) => ({
  type: actionTypes.OPERATION_START,
  payload: { operationInfo, tag },
});

const operationFail = (errorMsg) => ({
  type: actionTypes.OPERATION_FAIL,
  payload: errorMsg,
});

const operationSuccess = (successMsg) => ({
  type: actionTypes.OPERATION_SUCCESS,
  payload: successMsg,
});

const clearAlert = () => ({
  type: actionTypes.CLEAR_ALERT,
});

const setError = (msg) => ({
  type: actionTypes.SET_ERROR,
  payload: msg,
});

const amazonJob = (msg) => ({
  type: actionTypes.AMAZON_JOB,
  payload: msg,
});

export default {
  operationStart,
  operationFail,
  operationSuccess,
  amazonJob,
  clearAlert,
  setError,
};
