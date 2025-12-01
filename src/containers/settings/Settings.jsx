import React from "react";
import "./settings.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
  Profile,
  UserManagement,
  Activities,
  AlertSnackBar,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/reducers/users/users.actions";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Settings = () => {
  const [value, setValue] = React.useState(0);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const localUser = JSON.parse(localStorage.getItem("user"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAlert = () => {
    dispatch(actions.clearAlert());
  };

  return (
    <div className="znect__settings-container">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 500 }}
        open={users.isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <h2>Settings</h2>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} variant="fullWidth">
          <Tab label="Profile" />
          {localUser.role === "admin" && <Tab label="User Management" />}
          <Tab label="Activities" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Profile />
      </TabPanel>
      {localUser.role === "admin" && (
        <TabPanel value={value} index={1}>
          <UserManagement />
        </TabPanel>
      )}
      <TabPanel value={value} index={localUser.role === "admin" ? 2 : 1}>
        <Activities />
      </TabPanel>
      <AlertSnackBar
        open={Boolean(users.errorMsg) || Boolean(users.successMsg)}
        msg={Boolean(users.errorMsg) ? users.errorMsg : users.successMsg}
        severity={users.errorSeverity}
        handleAlertClose={handleAlert}
      />
    </div>
  );
};

export default Settings;
