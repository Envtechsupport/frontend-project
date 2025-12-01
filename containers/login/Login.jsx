import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import "./login.css";
import { LoginNav, LoginForm, AlertSnackBar } from "../../components";
import actions from "../../redux/reducers/auth/auth.actions";

const Login = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(actions.authCloseAlert());
  };

  return (
    <div className="znect__login-container">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={auth.isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="znect__login-container__left">
        <LoginNav />
        <div className="znect__login-container__content">
          <div className="znect__login-container__content-form">
            <h1>Welcome to Envelor</h1>
            <p>Sign in to your account</p>
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="znect__login-container__right"></div>
      <AlertSnackBar
        severity="error"
        open={auth.alert}
        msg={auth.errorMsg}
        handleAlertClose={() => handleClose()}
      />
    </div>
  );
};

export default Login;
