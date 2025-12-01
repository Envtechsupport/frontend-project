import actionTypes from "./reports.actionTypes";

const fetchStart = () => ({
  type: actionTypes.FETCH_START,
});

const fetchReportSuccess = (reports) => ({
  type: actionTypes.FETCH_REPORTS_SUCCESS,
  payload: reports,
});

const fetchFail = (error) => ({
  type: actionTypes.FAIL_ACTION,
  payload: error,
});

const downloadReport = (downloadMsg) => ({
  type: actionTypes.DOWNLOAD_REPORT,
  payload: downloadMsg,
});

const generateReportSuccess = (report) => ({
  type: actionTypes.GENERATE_REPORT_SUCCESS, // You will need to define this in actionTypes
  payload: report,
});

export default {
  fetchStart,
  fetchReportSuccess,
  fetchFail,
  downloadReport,
  generateReportSuccess,
};
