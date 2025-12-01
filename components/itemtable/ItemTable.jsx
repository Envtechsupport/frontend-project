import React from "react";
import "./itemtable.css";
import { addEllipsis } from "../../utilities/utils";

const ItemTable = ({ data, shippingFees }) => {
  const total = data
    .reduce((sum, row) => sum + parseFloat(row.price), 0)
    .toFixed(2);
  const grandTotal = shippingFees ? parseInt(total) + parseInt(shippingFees) : parseInt(total);

  return (
    <table>
      <thead>
        <tr>
          <th>Item Name</th>
          <th>SKU</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{addEllipsis(row.description, 20)}</td>
            <td>{row.sku}</td>
            <td>{row.qty}</td>
            <td>{parseFloat(row.qty) * parseFloat(row.price)}</td>
          </tr>
        ))}
        <tr>
          <td colSpan="3">
            <strong>Total</strong>
          </td>
          <td>
            <strong>{parseFloat(total) || "NaN"}</strong>
          </td>
        </tr>
        <tr>
          <td colSpan="3">
            <strong>Shipping Fees</strong>
          </td>
          <td>
            <strong>{parseFloat(shippingFees) || "NaN"}</strong>
          </td>
        </tr>
        <tr>
          <td colSpan="3">
            <strong>Grand Total</strong>
          </td>
          <td>
            <strong>
              {shippingFees
                ? parseFloat(total) + parseFloat(shippingFees)
                : parseFloat(total) || "NaN"}
            </strong>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ItemTable;
