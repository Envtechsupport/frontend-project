import AuthService from "../../../services/auth.service";
import actions from "./auth.actions";

export const getToken = (credentials, navigate) => async (dispatch) => {
  dispatch(actions.authLoginStart());
  try {
    const response = await AuthService.getToken(credentials);
    dispatch(actions.authLoginSuccess(response));

    // Navigate to dashboard upon successful login
    navigate("/");
  } catch (error) {
    dispatch(actions.authLoginFail(error.message));
  }
};
