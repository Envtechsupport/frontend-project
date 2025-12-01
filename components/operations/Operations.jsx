import React from "react";
import "./operations.css";
import SettingsIcon from "@mui/icons-material/Settings";
import { styled } from "@mui/material/styles";
import { ZnectOperations, AlertSnackBar } from "../../components";
import { getZnectPayload } from "../../utilities/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  addOperation,
  startAmazonJob,
} from "../../redux/reducers/znect/znect.thunks";
import actions from "../../redux/reducers/znect/znect.actions";

const CustomSettingsIcon = styled(SettingsIcon)({
  color: "#909090",
  fontSize: "34px",
  marginRight: "10px",
});

const Operations = () => {
  const dispatch = useDispatch();
  const znect = useSelector((state) => state.znect);

  const handleZnectOperation = (
    job,
    partnerId,
    operation = null,
    tag = null
  ) => {
    if (
      znect.isLoading &&
      Object.values(znect.isLoading).some((value) => value === true)
    ) {
      dispatch(actions.setError("An operation already running"));
    } else {
      const operationInfo = {
        job: job,
        partnerId: partnerId,
        operation: operation,
      };
      const payload = getZnectPayload(operationInfo);
      if (payload.partner_id === "" || payload.partner_id === null) {
        dispatch(actions.setError("Choose a partner"));
      } else if (partnerId === "78" && job === "amazon") {
        dispatch(startAmazonJob(null, tag));
      } else {
        dispatch(addOperation(payload, tag));
      }
    }
  };

  const handleAlert = () => {
    dispatch(actions.clearAlert());
  };
  return (
    <div className="znect__operations-container">
      <div className="znect__operations-info">
        <CustomSettingsIcon />
        <div className="znect__operations-info__title">
          <h4>Znect Operations</h4>
          <p>Execute basic znect operations from here</p>
        </div>
      </div>
      <ZnectOperations
        title="Process Amazon Orders"
        body="Run all the amazon jobs sequantially to process new orders and create labels"
        select={false}
        job="amazon"
        tag="amazon"
        onExecute={(operation, partnerId) =>
          handleZnectOperation(operation, "78", undefined, "amazon")
        }
      />
      <ZnectOperations
        title="Download New Orders"
        body="Executes the services to fetch new orders from the given partner's portal"
        select={true}
        job="downloader"
        tag="downloader"
        onExecute={(operation, partnerId) =>
          handleZnectOperation(operation, partnerId, undefined, "downloader")
        }
      />
      <ZnectOperations
        title="Create Orders in Znect"
        body="Executes the services to create orders in Znect for the given partner"
        select={true}
        job="file_processor"
        tag="file_processor"
        onExecute={(operation, partnerId) =>
          handleZnectOperation(
            operation,
            partnerId,
            undefined,
            "file_processor"
          )
        }
      />
      <ZnectOperations
        title="Create Labels"
        body="Executes the services to create labels for the newly added orders in Znect"
        select={false}
        job="label_generator"
        tag="label_generator"
        onExecute={(operation, partnerId) =>
          handleZnectOperation(
            operation,
            partnerId,
            undefined,
            "label_generator"
          )
        }
      />
      <ZnectOperations
        title="Send Tracking Info"
        body="Executes the services to send tracking details to the given partner"
        select={true}
        job="send_message"
        tag="shipment"
        onExecute={(operation, partnerId) =>
          handleZnectOperation(operation, partnerId, "ui_shipment", "shipment")
        }
      />
      <ZnectOperations
        title="Send Invoice"
        body="Executes the services to send the invoice to the given partner"
        select={true}
        job="send_message"
        tag="invoice"
        onExecute={(operation, partnerId) =>
          handleZnectOperation(operation, partnerId, "ui_invoice", "invoice")
        }
      />
      <ZnectOperations
        title="Add Orders to Odoo"
        body="Executes the services to push all new orders to Odoo"
        select={false}
        job="odoo_processor"
        tag="odoo_processor"
        onExecute={(operation, partnerId) =>
          handleZnectOperation(
            operation,
            partnerId,
            undefined,
            "odoo_processor"
          )
        }
      />
      <AlertSnackBar
        open={Boolean(znect.errorMsg) || Boolean(znect.successMsg)}
        msg={Boolean(znect.errorMsg) ? znect.errorMsg : znect.successMsg}
        severity={znect.errorSeverity}
        handleAlertClose={handleAlert}
      />
    </div>
  );
};

export default Operations;
