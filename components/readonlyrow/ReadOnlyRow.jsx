import React from "react";
import "./readonlyrow.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { styled } from "@mui/material/styles";

const CustomEditIcon = styled(EditIcon)({
  color: "#0047AB",
});

const CustomDeleteForeverIcon = styled(DeleteForeverIcon)({
  color: "#D22B2B",
});

const ReadOnlyRow = ({ row, columns, handleEditClick, onDelete }) => {
  return (
    <tr>
      {columns.map((column, index) => (
        <td key={index}>{row[column.field]}</td>
      ))}
      <td>
        <CustomEditIcon onClick={(event) => handleEditClick(event, row)} />
        <CustomDeleteForeverIcon onClick={() => onDelete(row)} />
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
