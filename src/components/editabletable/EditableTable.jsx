import React, { useState } from "react";
import "./editabletable.css";
import { EditableRow, ReadOnlyRow } from "../../components";

const EditableTable = ({ columns, rows, onDelete, onEdit, noEdit }) => {
  const [editRowId, setEditRowId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const handleEditClick = (event, row) => {
    event.preventDefault();
    setEditRowId(row.warehouse_id);
    setEditFormData(row);
  };

  const handleCancelClick = () => {
    setEditRowId(null);
  };

  const handleSaveClick = (event) => {
    event.preventDefault();
    setEditRowId(null);
    onEdit(editFormData);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.headerName}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) =>
          editRowId === row.warehouse_id ? (
            <EditableRow
              key={row.warehouse_id}
              editFormData={editFormData}
              columns={columns}
              noEdit={noEdit}
              handleFormChange={handleFormChange}
              handleSaveClick={handleSaveClick}
              handleCancelClick={handleCancelClick}
            />
          ) : (
            <ReadOnlyRow
              key={row.warehouse_id}
              row={row}
              columns={columns}
              handleEditClick={handleEditClick}
              onDelete={(row) => onDelete(row)}
            />
          )
        )}
      </tbody>
    </table>
  );
};

export default EditableTable;
