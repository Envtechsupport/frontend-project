import React, { useEffect, useState } from "react";
import "./profile.css";
import { styled } from "@mui/material/styles";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  updateUser,
  updatePassword,
} from "../../redux/reducers/users/users.thunks";
import FormControl from "@mui/material/FormControl";

const CustomAccountBoxIcon = styled(AccountBoxIcon)({
  color: "#909090",
  fontSize: "44px",
});

const Profile = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState("");
  const [credError, setCredError] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    designation: "",
    username: "",
  });
  const [credentials, setCredentials] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newInputs = { ...userInfo };
    newInputs[name] = value;
    setUserInfo(newInputs);
  };

  const handleCredChange = (event) => {
    const { name, value } = event.target;
    const newInputs = { ...credentials };
    newInputs[name] = value;
    setCredentials(newInputs);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setUserInfo({
      name: users.userDetail.name,
      designation: users.userDetail.designation,
      username: users.userDetail.username,
    });
    setEdit(true);
  };

  const onCredSubmit = (event) => {
    event.preventDefault();
    if (!credentials.currentPassword || !credentials.newPassword) {
      setCredError("Please fill in all fields.");
      return;
    }
    setCredError("");
    dispatch(updatePassword(credentials));
  };

  const onEditSubmit = (event) => {
    event.preventDefault();
    if (!userInfo.name || !userInfo.username || !userInfo.designation) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    dispatch(updateUser(userInfo));
    setEdit(false);
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className="znect__profile-container">
      <div className="znect__profile-info">
        <CustomAccountBoxIcon />
        <div className="znect__profile-info__title">
          <h4>Profile Informations</h4>
          <p>Basic profile details of the user</p>
        </div>
      </div>
      {users.userDetail && (
        <div className="znect__profile-input__container">
          <div className="znect__profile-input__container-block">
            <form onSubmit={onEditSubmit}>
              <div className="znect__profile-input">
                <p>Name</p>
                {edit ? (
                  <FormControl error={Boolean(error)}>
                    <TextField
                      name="name"
                      value={userInfo.name}
                      onChange={(event) => handleChange(event)}
                      size="small"
                      sx={{ width: "400px" }}
                      required
                    />
                  </FormControl>
                ) : (
                  <div className="znect__profile-value">
                    {users.userDetail.name}
                  </div>
                )}
              </div>
              <div className="znect__profile-input">
                <p>Designation</p>
                {edit ? (
                  <FormControl error={Boolean(error)}>
                    <TextField
                      required
                      name="designation"
                      value={userInfo.designation}
                      onChange={(event) => handleChange(event)}
                      size="small"
                      sx={{ width: "400px" }}
                    />
                  </FormControl>
                ) : (
                  <div className="znect__profile-value">
                    {users.userDetail.designation}
                  </div>
                )}
              </div>
              <div className="znect__profile-input">
                <p>Username</p>
                {edit ? (
                  <FormControl error={Boolean(error)}>
                    <TextField
                      required
                      name="username"
                      value={userInfo.username}
                      onChange={(event) => handleChange(event)}
                      size="small"
                      sx={{ width: "400px" }}
                    />
                  </FormControl>
                ) : (
                  <div className="znect__profile-value">
                    {users.userDetail.username}
                  </div>
                )}
              </div>
              {edit ? (
                <Button variant="contained" color="primary" type="submit">
                  Save
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEdit}
                >
                  Edit
                </Button>
              )}
            </form>
          </div>
          <div className="znect__profile-input__container-block">
            <form onSubmit={onCredSubmit}>
              <div className="znect__profile-input">
                <p>Current Password</p>
                <FormControl error={Boolean(credError)}>
                  <TextField
                    required
                    size="small"
                    type="password"
                    name="currentPassword"
                    value={credentials.currentPassword}
                    onChange={(event) => handleCredChange(event)}
                    sx={{
                      width: "400px",
                      '& input[type="password"]': {
                        width: "100%",
                        height: "22px",
                      },
                    }}
                  />
                </FormControl>
              </div>
              <div className="znect__profile-input">
                <p>New Password</p>
                <FormControl error={Boolean(credError)}>
                  <TextField
                    required
                    type="password"
                    name="newPassword"
                    value={credentials.newPassword}
                    onChange={(event) => handleCredChange(event)}
                    sx={{
                      width: "400px",
                      '& input[type="password"]': {
                        width: "100%",
                        height: "22px",
                      },
                    }}
                  />
                </FormControl>
              </div>
              <p
                style={{ fontSize: "10px", color: "red", marginBottom: "16px" }}
              >
                Min 8 characters in length. <br />
                Use combination of CAPS, Number, and Alpha Numeric characters.
              </p>
              <Button variant="contained" color="primary" type="submit">
                Update
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
