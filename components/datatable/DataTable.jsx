import React, { useState, useEffect, useRef } from "react";
import "./datatable.css";
import { addEllipsis } from "../../utilities/utils";

const DataTable = ({
                     rows,
                     columns,
                     options,
                     handleRowClick,
                     passValue,
                     onOptionClick,
                     toolTipIndex,
                     noaction,
                   }) => {
  const [openMenuRowIndex, setOpenMenuRowIndex] = useState(null);
  const actionButtonRef = useRef(null); // Ref for the action button
  const menuRef = useRef(null); // Ref for the menu

  const handleActionClick = (rowIndex, event) => {
    event.stopPropagation();
    setOpenMenuRowIndex(openMenuRowIndex === rowIndex ? null : rowIndex);
    actionButtonRef.current = event.currentTarget;
  };

  const handleCloseMenu = () => {
    setOpenMenuRowIndex(null);
  };

  const getRowClass = (row) => {
    if (row.reason === "Selling Below MAP") return "priority-high"; // Red
    if (row.reason && row.reason !== "None") return "priority-medium"; // Yellow
    return "";
  };

  useEffect(() => {
    document.addEventListener("click", handleCloseMenu);
    return () => {
      document.removeEventListener("click", handleCloseMenu);
    };
  }, []);

  useEffect(() => {
    if (
        openMenuRowIndex !== null &&
        menuRef.current &&
        actionButtonRef.current
    ) {
      const buttonRect = actionButtonRef.current.getBoundingClientRect();

      // Setting menu position dynamically
      menuRef.current.style.position = "fixed";
      menuRef.current.style.top = `${buttonRect.bottom + window.scrollY}px`;
      menuRef.current.style.left = `${buttonRect.left}px`;
    }
  }, [openMenuRowIndex]);

  return (
      <table>
        <thead className="sticky-header">
        <tr>
          {columns.map((col) => (
              <th key={col.key}>{col.title}</th>
          ))}
          {noaction ? null : <th>Action</th>}
        </tr>
        </thead>
        <tbody>
        {rows.map((row, rowIndex) => (
            <tr
                key={rowIndex}
                onClick={() => handleRowClick(row[passValue])}
                className={getRowClass(row)}
            >
              {columns.map((column, ind) => (
                  <td
                      key={`${rowIndex}-${column.key}`}
                      title={
                        toolTipIndex
                            ? ind === toolTipIndex
                                ? row[column.key]
                                : undefined
                            : undefined
                      }
                      className={
                        column.key === "error_description"
                            ? "error-description-cell"
                            : ""
                      }
                  >
                    {column.key === "error_description"
                        ? row[column.key] // Display full error description
                        : row[column.key]}
                  </td>
              ))}
              {noaction ? null : (
                  <td>
                    <button onClick={(event) => handleActionClick(rowIndex, event)}>
                      ...
                    </button>
                    {openMenuRowIndex === rowIndex && (
                        <div
                            ref={menuRef}
                            style={{
                              position: "absolute",
                              zIndex: 100,
                              backgroundColor: "white",
                              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                            }}
                        >
                          <ul style={{listStyle: "none", margin: 0, padding: 5}}>
                            {options.map((item, index) => (
                                <li
                                    key={index}
                                    style={{padding: "5px", cursor: "pointer"}}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onOptionClick(item, row);
                                    }}
                                >
                                  {item}
                                </li>
                            ))}
                          </ul>
                        </div>
                    )}
                  </td>
              )}
            </tr>
        ))}
        </tbody>
      </table>
  );
};

export default DataTable;
