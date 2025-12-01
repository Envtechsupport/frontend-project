import axiosInstance from "../axios/axiosInstance";

class OrderService {
  getOrders = async (page, pageSize) => {
    try {
      const response = await axiosInstance.get("/orders", {
        params: { page, pageSize }, // Pass the pagination parameters
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  getOrderDetails = async (poNumber) => {
    try {
      const encodedPo = encodeURIComponent(poNumber);
      const response = await axiosInstance.get(`/orders/${encodedPo}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  searchOrderByPONumber =  async (poNumber) => {
    try {
      const encodedPo = encodeURIComponent(poNumber);
      const response = await axiosInstance.get(`/orders/search/${encodedPo}`); // Call the appropriate endpoint
      return response.data; // The backend should return the order details
    } catch (error) {
      // Handle and throw errors with a default message fallback
      throw new Error(error.response.data);
    }
  };
  searchOrderByStatus = async (statusDescription) => {
    try {
      const encodedStatus = encodeURIComponent(statusDescription); // Encode the status description
      const response = await axiosInstance.get(`/orders/status/${encodedStatus}`); // Call the appropriate endpoint
      return response.data; // The backend should return the order details along with total orders
    } catch (error) {
      // Handle and throw errors with a default message fallback
      throw new Error(error.response?.data || "Error fetching orders by status"); // Use optional chaining to avoid accessing undefined properties
    }
  };
  searchOrdersByDate = async (orderDate) => {
    try {
      const encodedDate = encodeURIComponent(orderDate); // Encode the order date
      const response = await axiosInstance.get(`/orders/date/${encodedDate}`); // Call the appropriate endpoint
      return response.data; // The backend should return the order details along with total orders
    } catch (error) {
      // Handle and throw errors with a default message fallback
      throw new Error(error.response?.data || "Error fetching orders by date"); // Use optional chaining to avoid accessing undefined properties
    }
  };

  markOrderManual = async (orderInfo) => {
    try {
      const response = await axiosInstance.post("updatemanualorder", orderInfo);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  addPackage = async (pkgInfo) => {
    try {
      const response = await axiosInstance.post("insertpackage", pkgInfo);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  deletePackage = async (pkgInfo) => {
    try {
      const response = await axiosInstance.post("deletepackage", pkgInfo);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  updateTrackingInfo = async (trackingInfo) => {
    try {
      const response = await axiosInstance.post(
        "updateTrackingInfo",
        trackingInfo
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  uploadOrderFile = async (formData) => {
    try {
      const response = await axiosInstance.post("orderupload", formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  reprocessOrder = async (orderInfo) => {
    try {
      const response = await axiosInstance.post("reprocess", orderInfo);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  sendShipment = async (orderInfo) => {
    try {
      const response = await axiosInstance.post("shipment", orderInfo);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  sendInvoice = async (orderInfo) => {
    try {
      const response = await axiosInstance.post("invoice", orderInfo);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  addOdoo = async (orderInfo) => {
    try {
      const response = await axiosInstance.post("odoo_processor", orderInfo);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  getShippingDimensions = async (skuDetails) =>{
    try{
      const response = await axiosInstance.post("shipping_dimensions", skuDetails); 
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error)
    }
  };

  getActivities = async (identifier) => {
    try {
      const encodedIdentifier = encodeURIComponent(identifier);
      const response = await axiosInstance.get(`/activities/${encodedIdentifier}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || "Failed to fetch activities");
    }
  };

  createLabel = async (orderInfo) => {
    try {
      const response = await axiosInstance.post("label_gen", orderInfo);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  // OrderService.js (or wherever this lives)
  getLabel = async (orderInfo) => {
  try {
    const response = await axiosInstance.post("getlabel", orderInfo, {
      responseType: "blob", // PDF blob
    });
    return response.data; // return blob
  } catch (error) {
    throw new Error(
      error.response?.data ||
      error.message ||
      "Failed to fetch label"
    );
  }
};
}

export default new OrderService();
