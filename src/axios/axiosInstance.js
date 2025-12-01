import axios from "axios";
import actions from "../redux/reducers/auth/auth.actions";
import store from "../redux/store/createStore";

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user.accessToken;
};

const getRefreshToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user.refreshToken;
};

const axiosInstance = axios.create({
  baseURL: "/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log(originalRequest);
      try {
        const response = await axiosInstance.post("/token", {
          token: getRefreshToken(),
        });
        store.dispatch(actions.authRefreshToken(response.data.accessToken));
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
