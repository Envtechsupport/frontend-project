import React, { useState } from "react";
import "./znectoperations.css";
import Button from "@mui/material/Button";
import { getPartners } from "../../utilities/utils";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

const ZnectOperations = ({ title, body, select, job, tag, onExecute }) => {
  const znect = useSelector((state) => state.znect);
  const [partnerId, setPartnerId] = useState("");

  const handleSelectChange = (event) => {
    const partnerId = event.target.value;
    setPartnerId(partnerId);
  };

  return (
    <div className="znect__znectoperations-container">
      <div className="znect__znectoperations-body">
        <div className="znect__znectoperations-info">
          <h5>{title}</h5>
          <p>{body}</p>
          {select && (
            <>
              <h6 style={{ marginTop: "14px" }}>Choose Partner</h6>
              <Select
                value={partnerId}
                onChange={(event) => handleSelectChange(event)}
                required
                name="buyer_partner_id"
                sx={{ width: 180, height: 38 }}
              >
                {getPartners().map((partner, index) => (
                  <MenuItem id={index} value={partner.partner_id}>
                    {partner.partner_name}
                  </MenuItem>
                ))}
              </Select>
            </>
          )}
        </div>
        {znect.isLoading &&
        tag in znect.isLoading &&
        znect.isLoading[tag] ? null : (
          <Button
            variant="contained"
            color="primary"
            sx={{ width: 60, fontSize: 9, height: 24 }}
            onClick={() => {
              onExecute(job, partnerId);
            }}
          >
            Execute
          </Button>
        )}
      </div>
      {znect.isLoading && tag in znect.isLoading && znect.isLoading[tag] && (
        <Box sx={{ width: "100%", marginTop: "20px" }}>
          <LinearProgress />
        </Box>
      )}
    </div>
  );
};

export default ZnectOperations;
