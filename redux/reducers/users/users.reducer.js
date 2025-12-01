import initialStates from "./users.initialStates";
import actionTypes from "./users.actionTypes";
import { formatTimestamp } from "../../../utilities/utils";

const usersReducer = (state = initialStates, action) => {
  switch (action.type) {
    case actionTypes.FETCH_START:
      return {
        ...state,
        isLoading: true,
        errorMsg: null,
        successMsg: null,
      };
    case actionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        userList: action.payload,
        isLoading: false,
        errorMsg: null,
        successMsg: null,
      };
    case actionTypes.FAIL_ACTION:
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
      };
    case actionTypes.CREATE_USER:
      return {
        ...state,
        userList: [...state.userList, action.payload],
        isLoading: false,
        errorMsg: null,
        successMsg: "User Created Successfully",
        errorSeverity: "success",
      };
    case actionTypes.CLEAR_ALERT:
      return {
        ...state,
        errorMsg: null,
        successMsg: null,
      };
    case actionTypes.GET_USER:
      return {
        ...state,
        userDetail: action.payload,
        isLoading: false,
        errorMsg: null,
      };
    case actionTypes.UPDATE_USER:
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          ...action.payload,
        },
        isLoading: false,
        errorMsg: null,
        successMsg: "User Updated Successfully",
        errorSeverity: "success",
      };
    case actionTypes.UPDATE_PASSWORD:
      return {
        ...state,
        isLoading: false,
        errorMsg: null,
        successMsg: "Password Updated Successfully",
        errorSeverity: "success",
      };
    case actionTypes.GET_ACTIVITIES:
      const act = action.payload
        ? action.payload.map((item) => ({
            ...item,
            entered_timestamp: formatTimestamp(item.entered_timestamp),
          }))
        : null;
      return {
        ...state,
        activities: act,
        isLoading: false,
        errorMsg: null,
      };
    case actionTypes.DELETE_USER:
      const newUserList = state.userList.filter(
        (user) => user.id !== action.payload.user_id
      );
      return {
        ...state,
        userList: newUserList,
        isLoading: false,
        errorMsg: null,
        successMsg: "User Deleted Successfully",
        errorSeverity: "success",
      };
    default:
      return {
        ...state,
      };
  }
};

export default usersReducer;
