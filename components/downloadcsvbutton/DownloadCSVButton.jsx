import React, { useState } from "react";
import { GetAppOutlined as GetAppOutlinedIcon } from "@mui/icons-material";
import { styled } from "@mui/material";
import { AlertSnackBar } from "../../components";

const CustomIcon = styled("div")(({ size = "24px", color = "#909090" }) => ({
  color,
  fontSize: size,
  cursor: "pointer",
}));

const DownloadCSVButton = ({ data, filename }) => {
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMsg, setAlertMsg] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  const handleDownloadCSV = async () => {
    try {
      if (!data || data.length === 0) {
        setAlertSeverity("error");
        setAlertMsg("No data available to export.");
        setOpenAlert(true);
        return;
      }

      const columns = Object.keys(data[0]).filter((key) => key !== "id");
      const header = columns.join(",") + "\n";
      const rows = data
        .map((item) => columns.map((column) => item[column]).join(","))
        .join("\n");

      const csvContent = header + rows;
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", filename);

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setAlertSeverity("success");
      setAlertMsg("CSV file has been successfully downloaded.");
      setOpenAlert(true);
    } catch (error) {
      setAlertSeverity("error");
      setAlertMsg("Error exporting inventory data.");
      setOpenAlert(true);
      console.error("Error exporting inventory data:", error);
    }
  };

  return (
    <>
      <button className="export left-corner" onClick={handleDownloadCSV}>
        <CustomIcon as={GetAppOutlinedIcon} size="15px" color="#fff" />
        Export
      </button>
      <AlertSnackBar
        severity={alertSeverity}
        open={openAlert}
        msg={alertMsg}
        handleAlertClose={handleAlertClose}
      />
    </>
  );
};

export default DownloadCSVButton;
