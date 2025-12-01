import ZnectService from "../../../services/znect.service";
import actions from "./znect.actions";

export const addOperation = (operationInfo, tag) => async (dispatch) => {
  dispatch(actions.operationStart(operationInfo, tag));
  ZnectService.startOperation(operationInfo)
    .then((response) => {
      dispatch(actions.operationSuccess(response));
    })
    .catch((error) => {
      dispatch(actions.operationFail(error.message));
    });
};

export const startAmazonJob = (operationInfo, tag) => async (dispatch) => {
  dispatch(actions.operationStart(operationInfo, tag));
  ZnectService.startAmazonJob()
    .then((response) => {
      dispatch(actions.amazonJob(response));
    })
    .catch((error) => {
      dispatch(actions.operationFail(error.message));
    });
};
