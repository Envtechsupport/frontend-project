import React, { useEffect, useState } from "react";
import "./activities.css";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { styled } from "@mui/material/styles";
import { DataTable } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getActivities } from "../../redux/reducers/users/users.thunks";
import SkipPreviousOutlinedIcon from "@mui/icons-material/SkipPreviousOutlined";
import SkipNextOutlinedIcon from "@mui/icons-material/SkipNextOutlined";
import { MenuItem, Select, Box } from "@mui/material"; // Importing Material UI components

const CustomAssignmentOutlinedIcon = styled(AssignmentOutlinedIcon)({
  color: "#909090",
  fontSize: "34px",
  marginRight: "10px",
});

const CustomSkipPreviousOutlinedIcon = styled(SkipPreviousOutlinedIcon)({
  color: "#909090",
  fontSize: "24px",
});

const CustomSkipNextOutlinedIcon = styled(SkipNextOutlinedIcon)({
  color: "#909090",
  fontSize: "24px",
});

const columns = [
  { key: "user_name", title: "Username" },
  { key: "section", title: "Section" },
  { key: "identifier", title: "Identifier" },
  { key: "activity", title: "Activity" },
  { key: "entered_timestamp", title: "Timestamp" },
];

const options = ["Delete"];

const Activities = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const handleRowClick = (val) => {};

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleActionClick = (option, rowData) => {};

  return (
    <div className="znect__activities-container">
      <div className="znect__activities-info">
        <CustomAssignmentOutlinedIcon />
        <div className="znect__activities-header">
          <div className="znect__activities-info__title">
            <h4>User Activities</h4>
            <p>Inspect all the user activities from here</p>
          </div>

          {/* Items per Page Dropdown */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              marginTop: 2,
            }}
          >
            <div>
              <span
                style={{
                  marginLeft: '600px',
                  fontWeight: "normal", // Lighter weight
                  color: "#888",
                  marginRight: '10px' // Lighter color (gray)
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
          </Box>
        </div>
      </div>

      {users.activities && (
        <>
          <div className="znect__activity-box__table">
            <DataTable
              rows={users.activities.slice(startIndex, endIndex)}
              columns={columns}
              options={options}
              noaction={true}
              handleRowClick={(val) => handleRowClick(val)}
              onOptionClick={(option, rowData) =>
                handleActionClick(option, rowData)
              }
            />
          </div>
          <div className="znect__activity-box__page-controller">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              <CustomSkipPreviousOutlinedIcon />
            </button>
            <button
              onClick={handleNextPage}
              disabled={endIndex >= users.activities.length}
            >
              <CustomSkipNextOutlinedIcon />
            </button>
            <p>
              Page {currentPage} of{" "}
              {Math.ceil(users.activities.length / itemsPerPage)}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Activities;
