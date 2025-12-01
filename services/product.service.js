import axiosInstance from "../axios/axiosInstance";

class ProductService {
  getProducts = async () => {
    try {
      const response = await axiosInstance.get("/product");
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  getBuyboxReport = async () => {
    try {
      const response = await axiosInstance.get("/buybox_report");
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  updateProduct = async (productData) => {
    try {
      const response = await axiosInstance.post("updateproduct", productData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  addMappings = async (mappingData) => {
    try {
      const response = await axiosInstance.post("insertmapping", mappingData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  deleteMapping = async (mappingData) => {
    try {
      const response = await axiosInstance.post(
        "deleteskumapping",
        mappingData
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  deleteProduct = async (productInfo) => {
    try {
      const response = await axiosInstance.post("deleteproduct", productInfo);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };
}

export default new ProductService();
