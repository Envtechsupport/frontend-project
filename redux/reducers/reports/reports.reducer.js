import initialStates from "./reports.initialStates";
import actionTypes from "./reports.actionTypes";
import { formatTimestamp } from "../../../utilities/utils";

const reportReducer = (state = initialStates, action) => {
  switch (action.type) {
    case actionTypes.FETCH_START:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.FETCH_REPORTS_SUCCESS:
      const updatedReports = action.payload.map((item) => ({
        ...item,
        time_stamp: formatTimestamp(item.time_stamp),
      }));
      return {
        ...state,
        reports: updatedReports,
        isLoading: false,
      };
    case actionTypes.GENERATE_REPORT_SUCCESS: // Handle report generation success if necessary
    return {
      ...state,
      isLoading: false,
      successMsg: "Report generated successfully!", // Example success message
    };
    case actionTypes.FAIL_ACTION:
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
        errorSeverity: "error",
      };
    case actionTypes.CLEAR_ALERT:
      return {
        ...state,
        isLoading: false,
        errorMsg: null,
        successMsg: null,
        errorSeverity: "error",
      };
    case actionTypes.DOWNLOAD_REPORT:
      return {
        ...state,
        isLoading: false,
        errorMsg: null,
        successMsg: action.payload,
        errorSeverity: "success",
      };
    default:
      return {
        ...state,
      };
  }
};

export default reportReducer;
