import axiosInstance from "../axios/axiosInstance";

class UsersService {
  getUsers = async () => {
    try {
      const response = await axiosInstance.get("getusers");
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  addUser = async (user) => {
    try {
      const response = await axiosInstance.post("addusers", user);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  getUser = async () => {
    try {
      const response = await axiosInstance.get("getuser");
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  updateUser = async (user) => {
    try {
      const response = await axiosInstance.post("updateuser", user);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  updatePassword = async (cred) => {
    try {
      const response = await axiosInstance.post("updatepassword", cred);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  getActivities = async () => {
    try {
      const response = await axiosInstance.get("getactivities");
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  deleteUser = async (userId) => {
    try {
      const response = await axiosInstance.post("deleteuser", userId);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };
}

export default new UsersService();
