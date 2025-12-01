import axiosInstance from "../axios/axiosInstance";

class InventoryListService {
  getInventories = async () => {
    try {
      const response = await axiosInstance.get("inventory");
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  updateInventory = async (inventoryInfo) => {
    try {
      const response = await axiosInstance.post(
        "updateinventory",
        inventoryInfo
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  deleteWarehouseInventory = async (inventoryInfo) => {
    try {
      const response = await axiosInstance.post(
        "deletewarehouseinventory",
        inventoryInfo
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  deleteFullInventory = async (inventoryInfo) => {
    try {
      const response = await axiosInstance.post(
        "deleteinventory",
        inventoryInfo
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  uploadInvFile = async (formData) => {
    try {
      const response = await axiosInstance.post("invcsvupload", formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  exportInv = async () => {
    try {
      const response = await axiosInstance.get("exportinv");
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };
}

export default new InventoryListService();
