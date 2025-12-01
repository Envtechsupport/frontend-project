import axiosInstance from "../axios/axiosInstance";

class WarehousesService {
  getWarehouses = async () => {
    try {
      const response = await axiosInstance.get("warehouses");
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  addWarehouse = async (warehouseData) => {
    try {
      const response = await axiosInstance.post(
        "updatewarehouse",
        warehouseData
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  deleteWarehouseMapping = async (mappingData) => {
    try {
      const response = await axiosInstance.post(
        "deletewarehousemapping",
        mappingData
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  addWarehouseMapping = async (mappingData) => {
    try {
      const response = await axiosInstance.post(
        "addwarehousemapping",
        mappingData
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  deleteWarehouse = async (warehouse) => {
    try {
      const response = await axiosInstance.post("deletewarehouse", warehouse);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };
}

export default new WarehousesService();
