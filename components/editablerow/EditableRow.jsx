import React from "react";
import "./editablerow.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { styled } from "@mui/material/styles";

const CustomCheckCircleIcon = styled(CheckCircleIcon)({
  color: "#0047AB",
});

const CustomCancelIcon = styled(CancelIcon)({
  color: "#D22B2B",
});

const EditableRow = ({
  editFormData,
  columns,
  noEdit,
  handleFormChange,
  handleSaveClick,
  handleCancelClick,
}) => {
  return (
    <tr>
      {columns.map((column, index) => (
        <td key={index}>
          {noEdit.includes(column.field) ? (
            <span>{editFormData[column.field]}</span>
          ) : (
            <input
              type="text"
              name={column.field}
              value={editFormData[column.field]}
              onChange={handleFormChange}
            />
          )}
        </td>
      ))}
      <td>
        <CustomCheckCircleIcon onClick={handleSaveClick} />
        <CustomCancelIcon onClick={handleCancelClick} />
      </td>
    </tr>
  );
};

export default EditableRow;
