import ReportService from "../../../services/report.service";
import actions from "./reports.actions";

export const getReports = () => async (dispatch) => {
  dispatch(actions.fetchStart());
  ReportService.getReports()
    .then((response) => {
      console.log(response);
      dispatch(actions.fetchReportSuccess(response));
    })
    .catch((error) => {
      dispatch(actions.fetchFail(error.message));
    });
};

export const downloadReport = (payload, fileName) => async (dispatch) => {
  dispatch(actions.fetchStart());
  ReportService.downloadReport(payload, fileName)
    .then((response) => {
      dispatch(actions.downloadReport(response));
    })
    .catch((error) => {
      dispatch(actions.fetchFail(error.message));
    });
};

export const generateReport = (reportType) => async (dispatch) => {
  dispatch(actions.fetchStart());
  try {
    const response = await ReportService.generateReport(reportType); // Adjust this line according to your service
    dispatch(actions.fetchReportSuccess(response)); // Assuming you want to store generated report data
    // Optionally, handle a success message
  } catch (error) {
    dispatch(actions.fetchFail(error.message));
  }
};