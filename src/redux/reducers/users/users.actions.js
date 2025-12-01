import actionTypes from "./users.actionTypes";

const fetchStart = () => ({
  type: actionTypes.FETCH_START,
});

const fetchUserSucess = (users) => ({
  type: actionTypes.FETCH_USERS_SUCCESS,
  payload: users,
});

const fetchFail = (errorMsg) => ({
  type: actionTypes.FAIL_ACTION,
  payload: errorMsg,
});

const createUser = (user) => ({
  type: actionTypes.CREATE_USER,
  payload: user,
});

const clearAlert = () => ({
  type: actionTypes.CLEAR_ALERT,
});

const getUser = (userInfo) => ({
  type: actionTypes.GET_USER,
  payload: userInfo,
});

const updateUser = (user) => ({
  type: actionTypes.UPDATE_USER,
  payload: user,
});

const updatePassword = () => ({
  type: actionTypes.UPDATE_PASSWORD,
});

const getActivities = (activities) => ({
  type: actionTypes.GET_ACTIVITIES,
  payload: activities,
});

const deleteUser = (userId) => ({
  type: actionTypes.DELETE_USER,
  payload: userId,
});

export default {
  fetchStart,
  fetchUserSucess,
  fetchFail,
  createUser,
  clearAlert,
  getUser,
  updateUser,
  updatePassword,
  getActivities,
  deleteUser,
};
