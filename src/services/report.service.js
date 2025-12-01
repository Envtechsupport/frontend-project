import axiosInstance from "../axios/axiosInstance";

class ReportService {
  downloadReport = async (fileInfo, fileName) => {
    try {
      const response = await axiosInstance.post("/fetchreport", fileInfo, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      return "File Downloaded Successfully";
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  getReports = async () => {
    try {
      const response = await axiosInstance.get("/reports");
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };
  generateReport = async (reportType) => {
    try {
      const response = await axiosInstance.post("/reportprocess", {
        report_type: reportType,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || "Failed to generate report.");
    }
  };
}

export default new ReportService();
