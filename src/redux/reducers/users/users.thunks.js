import UsersService from "../../../services/users.service";
import actions from "./users.actions";

export const getUsers = () => async (dispatch) => {
  dispatch(actions.fetchStart());
  UsersService.getUsers()
    .then((response) => {
      dispatch(actions.fetchUserSucess(response));
    })
    .catch((error) => {
      dispatch(actions.fetchFail(error.message));
    });
};

export const addUser = (user) => async (dispatch) => {
  dispatch(actions.fetchStart());
  UsersService.addUser(user)
    .then((response) => {
      dispatch(actions.createUser(response));
    })
    .catch((error) => {
      dispatch(actions.fetchFail(error.message));
    });
};

export const getUser = () => async (dispatch) => {
  dispatch(actions.fetchStart());
  UsersService.getUser()
    .then((response) => {
      dispatch(actions.getUser(response));
    })
    .catch((error) => {
      dispatch(actions.fetchFail(error.message));
    });
};

export const updateUser = (user) => async (dispatch) => {
  dispatch(actions.fetchStart());
  UsersService.updateUser(user)
    .then((response) => {
      dispatch(actions.updateUser(user));
    })
    .catch((error) => {
      dispatch(actions.fetchFail(error.message));
    });
};

export const updatePassword = (cred) => async (dispatch) => {
  dispatch(actions.fetchStart());
  UsersService.updatePassword(cred)
    .then((response) => {
      dispatch(actions.updatePassword());
    })
    .catch((error) => {
      dispatch(actions.fetchFail(error.message));
    });
};

export const getActivities = () => async (dispatch) => {
  dispatch(actions.fetchStart());
  UsersService.getActivities()
    .then((response) => {
      dispatch(actions.getActivities(response));
    })
    .catch((error) => {
      dispatch(actions.fetchFail(error.message));
    });
};

export const deleteUser = (userId) => async (dispatch) => {
  dispatch(actions.fetchStart());
  UsersService.deleteUser(userId)
    .then((response) => {
      dispatch(actions.deleteUser(userId));
    })
    .catch((error) => {
      dispatch(actions.fetchFail(error.message));
    });
};
