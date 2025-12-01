import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { shipping_dimensions } from "../../redux/reducers/orders/order.thunks";
import "./packageinput.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const PackageInput = ({ getInputs, items, setDimensions }) => {
  const [inputs, setInputs] = useState([{ sku: "", quantity: "" }]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = async (index, event) => {
    const { name, value } = event.target;
    const newInputs = [...inputs];
    newInputs[index][name] = value;
    setInputs(newInputs);
    getInputs(newInputs);

    // Fetch dimensions only if both SKU and quantity are provided
    if (name === "quantity" || name === "sku") {
      const sku = newInputs[index].sku;
      const quantity = newInputs[index].quantity;
      const skuDetails = { sku, quantity };

      if (sku && quantity) {
        setLoading(true);
        try {
          const result = await dispatch(shipping_dimensions(skuDetails));
          if (result) { // Check if result is valid (not null or undefined)
            setDimensions({
              length: result.length || "",
              width: result.width || "",
              height: result.height || "",
              weight: result.weight || "",
            });
          } else {
            setDimensions({
              length: "",
              width: "",
              height: "",
              weight: "",
            }); // Clear dimensions if result is not valid
          }
        } catch (error) {
          console.error("Failed to fetch dimensions:", error);
          setDimensions({
            length: "",
            width: "",
            height: "",
            weight: "",
          }); // Clear dimensions on error
        } finally {
          setLoading(false);
        }
      } else {
        setDimensions({
          length: "",
          width: "",
          height: "",
          weight: "",
        }); // Clear dimensions if SKU or quantity is missing
      }
    }
  };

  const addInput = () => {
    setInputs([...inputs, { sku: "", quantity: "" }]);
  };

  const removeInput = (index) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
  };

  return (
    <div className="znect__packageinput-container">
      {inputs.map((input, index) => (
        <div key={index} className="znect__packageinput-control">
          <div>
            <p>SKU</p>
            <Select
              name="sku"
              value={input.sku}
              onChange={(event) => handleChange(index, event)}
              displayEmpty
              sx={{ width: 410, height: 40 }}
            >
              <MenuItem value="">None</MenuItem>
              {items.map((item, idx) => (
                <MenuItem key={idx} value={item.sku}>
                  {item.sku}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div>
            <p>Quantity</p>
            <TextField
              name="quantity"
              value={input.quantity}
              variant="outlined"
              onChange={(event) => handleChange(index, event)}
              sx={{
                "& .MuiInputBase-root": {
                  height: "40px",
                  width: "80px",
                },
              }}
            />
          </div>
          <div>
            <button onClick={() => removeInput(index)}>x</button>
          </div>
        </div>
      ))}

      <div className="znect__packageinput-addbtn">
        <button onClick={addInput}>Add More</button>
      </div>

      {loading && <p>Loading...</p>}
    </div>
  );
};

export default PackageInput;
