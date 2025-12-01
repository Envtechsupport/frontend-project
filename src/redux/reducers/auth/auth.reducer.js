import actionTypes from "./auth.actionTypes";
import initialStates from "./auth.initialStates";

const authReducer = (state = initialStates, action) => {
  switch (action.type) {
    case actionTypes.AUTH_LOGIN_START:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.AUTH_LOGIN_SUCCESS:
      const { accessToken, refreshToken, name, role } = action.payload;
      localStorage.setItem(
        "user",
        JSON.stringify({ accessToken, refreshToken, name, role })
      );
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.AUTH_LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
        alert: true,
      };
    case actionTypes.AUTH_REFRESH_TOKEN:
      const userData = JSON.parse(localStorage.getItem("user"));
      userData.accessToken = action.payload;
      localStorage.setItem("user", JSON.stringify(userData));
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.AUTH_LOGOUT:
      localStorage.removeItem("user");
      return {
        ...state,
      };
    case actionTypes.AUTH_CLOSE_ALERT:
      return {
        ...state,
        alert: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default authReducer;
