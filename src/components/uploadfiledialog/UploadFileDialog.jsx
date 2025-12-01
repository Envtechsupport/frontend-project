import React, { useState } from "react";
import "./uploadfiledialog.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { FilePreview } from "../../components";
import Papa from "papaparse";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const UploadFileDialog = ({
  open,
  handleClose,
  handleUpload,
  title,
  body,
  showPdf,
  multiCsv,
}) => {
  const [csvFile, setCsvFile] = useState(null);
  const [multiCsvFile, setMultiCsvFile] = useState([]);
  const [pdfFiles, setPdfFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleCsvFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCsvFile(file);
      previewCsvFile(file);
    }
  };

  const handleMultiCsvFileChange = (event) => {
    const files = Array.from(event.target.files);
    setMultiCsvFile(files);
  };

  const handlePdfFilesChange = (event) => {
    const files = Array.from(event.target.files);
    setPdfFiles(files);
  };

  const previewCsvFile = (file) => {
    Papa.parse(file, {
      complete: (results) => {
        setPreview(results.data);
      },
      header: false,
    });
  };

  const handleFileUpload = () => {
    if (multiCsv) {
      handleUpload(multiCsvFile, pdfFiles);
    } else {
      handleUpload(csvFile, pdfFiles);
    }
  };

  const previewClose = () => {
    setPreviewOpen(false);
  };

  const handlePreview = () => {
    setPreviewOpen(true);
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <div className="znect__fileupload-container">
          <h4>{body}</h4>
          <p>Upload CSV</p>
          {multiCsv ? (
            <input
              type="file"
              accept=".csv"
              multiple
              onChange={handleMultiCsvFileChange}
            />
          ) : (
            <input type="file" accept=".csv" onChange={handleCsvFileChange} />
          )}
          {showPdf && (
            <>
              <p>Upload PDFs</p>
              <input
                type="file"
                accept="application/pdf"
                multiple
                onChange={handlePdfFilesChange}
              />
            </>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        {!multiCsv && (
          <Button autoFocus onClick={handlePreview}>
            Preview
          </Button>
        )}
        <Button autoFocus onClick={() => handleFileUpload()}>
          Save changes
        </Button>
      </DialogActions>
      <FilePreview
        open={previewOpen}
        handleClose={previewClose}
        preview={preview}
      />
    </BootstrapDialog>
  );
};

export default UploadFileDialog;
