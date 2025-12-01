import React, { useState, useEffect } from "react";
import "./usermanagement.css";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import {
  AddUserDialog,
  DataTable,
  PermissionDialog,
  AlertDialog,
} from "../../components";
import { deleteUser, getUsers } from "../../redux/reducers/users/users.thunks";
import { useDispatch, useSelector } from "react-redux";
import SkipPreviousOutlinedIcon from "@mui/icons-material/SkipPreviousOutlined";
import SkipNextOutlinedIcon from "@mui/icons-material/SkipNextOutlined";

const CustomManageAccountsOutlinedIcon = styled(ManageAccountsOutlinedIcon)({
  color: "#909090",
  fontSize: "44px",
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
  { key: "id", title: "User ID" },
  { key: "name", title: "Name" },
  { key: "username", title: "Username" },
  { key: "designation", title: "Designation" },
  { key: "role", title: "Role" },
  { key: "created_at", title: "Created At" },
];

const options = ["Delete", "Permissions"];

const UserManagement = () => {
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [openPermDialg, setOpenPermDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const itemsPerPage = 7;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleUserDialogClose = () => {
    setOpenUserDialog(false);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleOpenUserDialog = () => {
    setOpenUserDialog(true);
  };

  const handleRowClick = (val) => {};

  const handleActionClick = (option, rowData) => {
    if (option === "Permissions") {
      setOpenPermDialog(true);
    } else if (option === "Delete") {
      setAlertDialogOpen(true);
      setSelectedUser(rowData);
    }
  };

  const handleAlertAction = (alertFlag) => {
    if (!alertFlag) {
      setAlertDialogOpen(false);
    } else if (alertFlag) {
      setAlertDialogOpen(false);
      dispatch(deleteUser({ user_id: selectedUser.id }));
    }
  };

  const handlePermDialogClose = () => {
    setOpenPermDialog(false);
  };

  return (
    <div className="znect__usermanagement-container">
      <div className="znect__usermanagement-info">
        <div className="znect__usermanagement-info__body">
          <CustomManageAccountsOutlinedIcon />
          <div className="znect__usermanagement-info__title">
            <h4>User Directory</h4>
            <p>Manage all user profiles (add/delete)</p>
          </div>
        </div>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: 120, fontSize: 10, height: 34 }}
          onClick={handleOpenUserDialog}
        >
          Add User
        </Button>
      </div>
      {users.userList && (
        <>
          <div className="znect__user-box__table">
            <DataTable
              rows={users.userList.slice(startIndex, endIndex)}
              columns={columns}
              options={options}
              handleRowClick={(val) => {
                handleRowClick(val);
              }}
              onOptionClick={(option, rowData) => {
                handleActionClick(option, rowData);
              }}
            />
          </div>
          <div className="znect__user-box__page-controller">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              <CustomSkipPreviousOutlinedIcon />
            </button>
            <button
              onClick={handleNextPage}
              disabled={endIndex >= users.userList.length}
            >
              <CustomSkipNextOutlinedIcon />
            </button>
            <p>
              Page {currentPage} of{" "}
              {Math.ceil(users.userList.length / itemsPerPage)}
            </p>
          </div>
        </>
      )}
      <PermissionDialog
        open={openPermDialg}
        handleClose={handlePermDialogClose}
      />
      <AddUserDialog
        open={openUserDialog}
        handleClose={handleUserDialogClose}
      />
      <AlertDialog
        open={alertDialogOpen}
        title="Delete the user ?"
        handleAction={(flag) => handleAlertAction(flag)}
        body="Are you sure you want to delete this user? This action can't be undone"
      />
    </div>
  );
};

export default UserManagement;
