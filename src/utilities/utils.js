export const addEllipsis = (text, maxLength) => {
  const sentences = text.split("."); // Split text into sentences

  // Iterate over each sentence and add ellipsis if necessary
  const newText = sentences
    .map((sentence) => {
      if (sentence.length > maxLength) {
        // Trim sentence to maxLength characters and add ellipsis
        return sentence.substring(0, maxLength) + "...";
      } else {
        // Leave sentence unchanged if it's shorter than maxLength
        return sentence;
      }
    })
    .join("."); // Join sentences back into a single string

  return newText;
};

export const getStatus = (statusCode) => {
  const statusNames = {
    RC: "Received",
    ET: "Entered",
    IC: "Pending",
    MP: "Manual",
    SLC: "Shipped",
    SH: "Shipment Sent",
    OC: "Odoo Added",
    IS: "Invoice Sent",
    SLN: "Shipping Label Not created",
    OF: "Odoo Failed",
  };
  if (statusCode in statusNames) {
    return statusNames[statusCode];
  }
  return null;
};

export const getReportNames = () => {
  return [
    { report_type: "shipping_cost", report_name: "Shipping Cost" },
    { report_type: "buybox", report_name: "Amazon BuyBox" },
    { report_type: "daily_order_report", report_name: "Daily Order Report" },
    { report_type: "partner_order_report", report_name: "Order Info" },
    {
      report_type: "restock_inv_recommendation",
      report_name: "Restock Inventory Recommendation",
    },
  ];
};

export const getReporttypes = () => {
  return [
    { report_type: "shipping_cost", report_name: "Shipping Cost" },
    { report_type: "buybox", report_name: "Amazon BuyBox" },
    { report_type: "daily_order_report", report_name: "Daily Order Report" },
    { report_type: "partner_order_report", report_name: "Order Info" },
    {
      report_type: "restock_inv_recommendation",
      report_name: "Restock Inventory Recommendation",
    },
  ];
};

export const getPartnerName = (partnerId) => {
  const partnerNames = {
    78: "Amazon",
    1549: "Homedepot",
    1612: "Target",
    74: "Lowes",
    1530: "Wayfair",
    1550: "Overstock",
    1: "EnvelorHome",
    6: "Walmart",
    2: "SolLiving",
    S1: "Envelor",
  };
  if (partnerId in partnerNames) {
    return partnerNames[partnerId];
  }
  return null;
};

export const formatTimestamp = (input) => {
  // Create a new Date object from the input string
  let date = new Date(input);

  // Ensure the date is valid
  if (isNaN(date.getTime())) {
    return null;
  }

  // Extract the components
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  let day = String(date.getDate()).padStart(2, "0");
  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");

  // Format the date and time into the desired format
  let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

  return formattedDate;
};

export const formatAddress = (addressInput) => {
  // Extract the necessary fields
  const {
    first_name,
    last_name,
    street1,
    street2,
    city,
    state_abbrev,
    zip,
    country,
  } = addressInput;

  // Construct the address string
  let address = (
    <p>
      {first_name} {last_name},<br />
      {street1},
      {street2 ? (
        <>
          <br />
          {street2},
        </>
      ) : null}
      <br />
      {city},{state_abbrev},<br />
      {country},{zip}
    </p>
  );
  return address;
};

export const getPartners = () => {
  return [
    { partner_id: "78", partner_name: "Amazon" },
    { partner_id: "1549", partner_name: "Homedepot" },
    { partner_id: "1612", partner_name: "Target" },
    { partner_id: "74", partner_name: "Lowes" },
    { partner_id: "1530", partner_name: "Wayfair" },
    { partner_id: "1550", partner_name: "Overstock" },
    { partner_id: "1", partner_name: "EnvelorHome" },
    { partner_id: "6", partner_name: "Walmart" },
    { partner_id: "2", partner_name: "SolLiving" },
  ];
};

export const convertToTime = (timestamp) => {
  // Create a new Date object from the timestamp
  const date = new Date(timestamp);

  // Extract hours, minutes, and seconds using toLocaleTimeString
  const timeString = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Ensure 24-hour time format
  });

  return timeString;
};

const getDownloaderConfig = (partnerId) => {
  switch (partnerId) {
    case "6":
      return {
        protocol: "api",
        preprocess: "no",
      };
    case "1":
      return {
        protocol: "api",
        preprocess: "no",
      };
    case "2":
      return {
        protocol: "api",
        preprocess: "no",
      };
    case "78":
      return {
        protocol: "api",
        preprocess: "no",
      };
    case "74":
      return {
        protocol: "sftp",
        preprocess: "yes",
      };
    case "1549":
      return {
        protocol: "sftp",
        preprocess: "yes",
      };
    case "1612":
      return {
        protocol: "ftp",
        preprocess: "no",
      };
    case "1550":
      return {
        protocol: "ftps",
        preprocess: "yes",
      };
    case "1530":
      return {
        protocol: "api",
        preprocess: "no",
      };
    default:
      return {};
  }
};

export const getZnectPayload = (operationInfo) => {
  switch (operationInfo.job) {
    case "downloader":
      return {
        partner_id: operationInfo.partnerId,
        job: operationInfo.job,
        operation: "dl",
        message_type: "orders",
        ...getDownloaderConfig(operationInfo.partnerId),
      };
    case "file_processor":
      return {
        partner_id: operationInfo.partnerId,
        job: operationInfo.job,
      };
    case "label_generator":
      return {
        partner_id: "S1",
        job: operationInfo.job,
        operation: "SMALL_PARCEL",
      };
    case "odoo_processor":
      return {
        partner_id: "S1",
        job: operationInfo.job,
        operation: "order",
      };
    case "send_message":
      return {
        partner_id: operationInfo.partnerId,
        job: operationInfo.job,
        operation: operationInfo.operation,
      };
    case "amazon":
      return {
        partner_id: "78",
        job: "amazon",
        operation: null,
      };
    default:
      return null;
  }
};

export const hasEmptyOrUndefined = (obj) => {
  return Object.values(obj).some(
    (value) => value === "" || value === undefined
  );
};

export const formatDateToUTCString = (date) => {
  const pad = (number) => (number < 10 ? "0" : "") + number;

  return (
    date.getUTCFullYear() +
    "-" +
    pad(date.getUTCMonth() + 1) +
    "-" +
    pad(date.getUTCDate()) +
    " " +
    pad(date.getUTCHours()) +
    ":" +
    pad(date.getUTCMinutes()) +
    ":" +
    pad(date.getUTCSeconds())
  );
};
