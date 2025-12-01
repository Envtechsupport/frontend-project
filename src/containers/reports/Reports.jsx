import React, { useEffect, useState, useMemo } from "react";
import "./reports.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { getReportNames, getReporttypes } from "../../utilities/utils";
import {
  Select,
  MenuItem,
  Button,
  FormControl,
  Snackbar,
  TextField,
  InputLabel,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { DataTable } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import SkipPreviousOutlinedIcon from "@mui/icons-material/SkipPreviousOutlined";
import SkipNextOutlinedIcon from "@mui/icons-material/SkipNextOutlined";
import {
  downloadReport,
  getReports,
  generateReport,
} from "../../redux/reducers/reports/reports.thunks";

const columns = [
  { key: "id", title: "ID" },
  { key: "file_name", title: "Report Name" },
  { key: "report_type", title: "Report Type" },
  { key: "time_stamp", title: "Report Date" },
];

const CustomSkipPreviousOutlinedIcon = styled(SkipPreviousOutlinedIcon)({
  color: "#909090",
  fontSize: "24px",
});

const CustomSkipNextOutlinedIcon = styled(SkipNextOutlinedIcon)({
  color: "#909090",
  fontSize: "24px",
});

const Reports = () => {
  const dispatch = useDispatch();
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const report = useSelector((state) => state.report);
  const [reportType, setReportType] = useState("");
  const [reportName, setreportName] = useState("");
  const [isError, setIsError] = useState(false); // Remove this if not used
  const [partnerId, setPartnerId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [filterstartDate, setfilterstartDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [endDate, setEndDate] = useState("");
  const [filterendDate, setfilterEndDate] = useState("");
  const [searchName, setSearchName] = useState(""); // State for report name search
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loadingReport, setLoadingReport] = useState(false);
  const options = ["Download"];

  // Calculate the start and end index of items to display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    dispatch(getReports());
  }, [dispatch]);

  const handleSelectChange = (event) => {
    const { value } = event.target;
    setReportType(value);
  };

  const handleSelectName = (event) => {
    const { value } = event.target;
    setreportName(value);
  };

  const handleGenerateClick = () => {
    if (!reportType) {
      setSnackbarMessage(
        "Please fill all required fields (Report Type and Partner ID)."
      );
      setOpenSnackbar(true);
      return;
    }

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      setSnackbarMessage("Start date cannot be later than end date.");
      setOpenSnackbar(true);
      return;
    }

    setLoadingReport(true);

    const payload = {
      report_type: reportType,
      partner_id: partnerId || "None",
      start_date: startDate || "None",
      end_date: endDate || "None",
    };

    dispatch(generateReport(payload))
      .then(() => {
        setSnackbarMessage("Report processing initiated successfully.");
        setOpenSnackbar(true);
      })
      .catch((error) => {
        setSnackbarMessage(
          `Error initiating report processing: ${error.message}`
        );
        setOpenSnackbar(true);
      })
      .finally(() => {
        setLoadingReport(false);
      });
  };

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);

    if (endDate && new Date(newStartDate) > new Date(endDate)) {
      setIsError(true);
      setSnackbarMessage("Start date cannot be later than End date.");
      setOpenSnackbar(true);
    } else {
      setIsError(false);
    }
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);

    if (startDate && new Date(startDate) > new Date(newEndDate)) {
      setIsError(true);
      setSnackbarMessage("Start date cannot be later than end date.");
      setOpenSnackbar(true);
    } else {
      setIsError(false);
    }
  };

  const handlefilterStartDateChange = (e) => {
    const newfilterStartDate = e.target.value;
    setfilterstartDate(newfilterStartDate);

    if (filterendDate && new Date(newfilterStartDate) > new Date(filterendDate)) {
      setIsError(true);
      setSnackbarMessage("Start date cannot be later than end date.");
      setOpenSnackbar(true);
    } else {
      setIsError(false);
    }
  };

  const handlefilterEndDateChange = (e) => {
    const newfilterEndDate = e.target.value;
    setfilterEndDate(newfilterEndDate);

    if (filterstartDate && new Date(filterstartDate) > new Date(newfilterEndDate)) {
      setIsError(true);
      setSnackbarMessage("Start date cannot be later than end date.");
      setOpenSnackbar(true);
    } else {
      setIsError(false);
    }
  };

  const handleClick = (report) => {
    console.log(report);
  };

  const handleOptionClick = (item, value) => {
    // Check if value is valid and contains the required properties
    if (item === "Download" && value?.file_path && value?.file_name) {
      const payload = {
        filePath: value.file_path,
      };
      dispatch(downloadReport(payload, value.file_name));
    } else {
      console.error("Invalid action or value:", { item, value });
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Filtered reports based on various criteria
  const filteredReports = useMemo(() => {
    console.log(report.reports); // Debugging
    if (!report.reports || !Array.isArray(report.reports)) return [];

    return report.reports.filter((report) => {
      const matchesReportType = reportName
        ? report.report_type === reportName
        : true;
      const matchesDateRange =
        (!filterstartDate || new Date(report.time_stamp) >= new Date(filterstartDate)) &&
        (!filterendDate || new Date(report.time_stamp) <= new Date(filterendDate));
      const matchesReportName = report.file_name
        .toLowerCase()
        .includes(searchName.toLowerCase());

      return (
        matchesReportType &&
        matchesDateRange &&
        matchesReportName
      );
    });
  }, [report.reports, reportName, filterstartDate, filterendDate, searchName]);

  // Render loading state
  if (report.isLoading) {
    return <CircularProgress />; // Show loading spinner while fetching data
  }

  // Handle no reports available
  if (!report.reports || report.reports.length === 0) {
    return <Typography>No reports available</Typography>; // Handle null state gracefully
  }

  return (
    <div className="znect__report-container">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 500 }}
        open={report.isLoading || loadingReport}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="znect__report-title">
        <h2>Reports</h2>
      </div>
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <div className="znect__report-controller">
          <div className="znect__report-controller__contents">
            <h4>Generate Report</h4>
            <p>
              You can generate Znect reports by choosing the required report
              type and by clicking on the generate button.
            </p>
            <FormControl error={false} sx={{ marginTop: 3, marginRight: 2 }}>
              <InputLabel id="report-type-label" sx={{ marginBottom: 1 }}>
                Report Type
              </InputLabel>

              <Select
                label="Report Type"
                labelId="report-type-label"
                required
                name="report_type"
                sx={{
                  width: 180,
                  height: 40,
                }}
                value={reportType}
                onChange={handleSelectChange}
              >
                {getReportNames().map((carrier, index) => (
                  <MenuItem key={index} value={carrier.report_type}>
                    {carrier.report_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* Input fields for additional arguments */}
            <TextField
              label="Partner ID"
              variant="outlined"
              value={partnerId}
              onChange={(e) => setPartnerId(e.target.value)}
              sx={{
                width: 180,
                height: 40,
                flexDirection: "row",
                marginTop: 3,
                marginRight: 2,
              }}
              InputLabelProps={{
                shrink: true, // Ensures the label stays shrunk for date inputs
              }}
            />
            <TextField
              label="Start Date"
              variant="outlined"
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              sx={{
                width: 180,
                height: 40,
                flexDirection: "row",
                marginTop: 3,
                marginRight: 2,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              label="End Date"
              variant="outlined"
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              sx={{
                width: 180,
                height: 40,
                flexDirection: "row",
                marginTop: 3,
                marginRight: 2,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ marginTop: 2 }}
            >
              Default Date Range: The date range is automatically set to the
              last 5 days from today.
            </Typography>
          </div>
          <div className="znect__report-controller__btn">
            <Button
              variant="contained"
              onClick={handleGenerateClick}
              style={{ marginTop: "75px" }}
            >
              Generate
            </Button>
          </div>
        </div>
      </Box>

      <Divider sx={{ margin: "20px 0" }} />
      {/* Boxy DataTable Section */}
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Report List
        </Typography>
        <div
          className="znect__report-box__filter-content"
          style={{
            display: "flex", // Flex container to arrange items in a row
            flexDirection: "row", // Row direction
            alignItems: "center", // Align items vertically in the center
            flexWrap: "wrap", // Allows wrapping if the screen size is smaller
            gap: "40px", // Optional: Adds a gap between the items
          }}
        >
          {/* Dropdown Filter */}
          <FormControl>
            <InputLabel id="filter-report-type-label"></InputLabel>
            <Select
              labelId="filter-report-type-label"
              value={reportName}
              onChange={handleSelectName}
              displayEmpty
              sx={{
                height: 40, // Set height of the Select dropdown
              }}
            >
              <MenuItem value="">None</MenuItem>
              {getReporttypes().map((carrier, index) => (
                <MenuItem key={index} value={carrier.report_type}>
                  {carrier.report_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Search Field */}
          <TextField
            label="Search Report Name"
            variant="outlined"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            sx={{
              "& .MuiInputBase-root": {
                height: "40px", // Adjust the height of the input area
              },
              "& .MuiInputLabel-root": {
                top: "5px", // Adjust this value to move the label higher
                fontSize: "1rem", // Optional: adjust font size if needed
              },
            }}
            InputLabelProps={{
              shrink: true, // Keeps the label at the top
            }}
          />
          {/* Date Range Filter */}
          <TextField
            label="Start Date"
            type="date"
            value={filterstartDate}
            onChange={handlefilterStartDateChange}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              "& .MuiInputBase-root": {
                height: "40px", // Adjust the height of the input area
              },
            }}
          />
          <TextField
            label="End Date"
            type="date"
            value={filterendDate}
            onChange={handlefilterEndDateChange}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              "& .MuiInputBase-root": {
                height: "40px", // Adjust the height of the input area
              },
            }}
          />
          <div>
            <span
              style={{
                fontWeight: "normal", // Lighter weight
                color: "#888", // Lighter color (gray)
                marginLeft: "10px",
                marginRight: "5px",
              }}
            >
              Items Per Page:
            </span>
            <Select
              name="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(e.target.value);
                setCurrentPage(1); // Reset to the first page when items per page changes
              }}
              sx={{
                width: 65,
                height: 30,
              }}
            >
              {[15, 30, 50].map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
        <Divider sx={{ margin: "20px 0" }} />
        <div
          style={{
            border: "1px solid #ccc", // Border style
            borderRadius: "8px", // Rounded corners
            padding: "16px", // Padding inside the box
            backgroundColor: "#fff", // Background color
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Shadow effect
            marginBottom: "20px", // Space below the box
          }}
        >
          <div className="znect__report-box">
            <DataTable
              rows={filteredReports.slice(startIndex, endIndex)}
              columns={columns}
              options={options}
              handleRowClick={(report) => {
                handleClick(report);
              }}
              onOptionClick={(item, value) => handleOptionClick(item, value)}
              passValue="id"
            />
          </div>
        </div>
        <div className="znect__report-container__page-controller">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            <CustomSkipPreviousOutlinedIcon />
          </button>
          <button
            onClick={handleNextPage}
            disabled={endIndex >= filteredReports.length}
          >
            <CustomSkipNextOutlinedIcon />
          </button>
          <p>
            Page {currentPage} of{" "}
            {Math.ceil(filteredReports.length / itemsPerPage)}
          </p>
        </div>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </div>
  );
};

export default Reports;
