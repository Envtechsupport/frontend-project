import axiosInstance from "../axios/axiosInstance";

class ZnectService {
  startOperation = async (operationInfo) => {
    try {
      const response = await axiosInstance.post("znect", operationInfo);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  startAmazonJob = async () => {
    try {
      const response = await axiosInstance.post("amazonjobs");
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };
}

export default new ZnectService();
