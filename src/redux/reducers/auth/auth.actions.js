import actionTypes from "./auth.actionTypes";

const authLoginStart = () => ({
  type: actionTypes.AUTH_LOGIN_START,
});

const authLoginSuccess = (token) => ({
  type: actionTypes.AUTH_LOGIN_SUCCESS,
  payload: token,
});

const authLoginFail = (error) => ({
  type: actionTypes.AUTH_LOGIN_FAIL,
  payload: error,
});

const authRefreshToken = (token) => ({
  type: actionTypes.AUTH_REFRESH_TOKEN,
  payload: token,
});

const authLogout = () => ({
  type: actionTypes.AUTH_LOGOUT,
});

const authCloseAlert = () => ({
  type: actionTypes.AUTH_CLOSE_ALERT,
});

export default {
  authLoginStart,
  authLoginSuccess,
  authLoginFail,
  authRefreshToken,
  authLogout,
  authCloseAlert,
};
