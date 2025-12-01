import React, { useState } from "react";
import "./warehousedrawer.css";
import { useSelector, useDispatch } from "react-redux";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { WarehouseDialogForm } from "../../components";
import WarehouseMappingDialog from "../warehousemappingdialog/WarehouseMappingDialog";
import { updateWarehouse } from "../../redux/reducers/warehouses/warehouses.thunks";

const WarehouseDrawer = ({ anchor, open, onClose }) => {
  const warehouse = useSelector((state) => state.warehouse);
  const [mappingDialogOpen, setMappingDialogOpen] = useState(false);
  const [openWarehouseDialog, setOpenWarehouseDialog] = useState(false);
  const dispatch = useDispatch();

  const handleFormClose = () => {
    setOpenWarehouseDialog(false);
  };

  const submitFormData = (warehouseData) => {
    dispatch(updateWarehouse(warehouseData));
  };

  const handleEdit = () => {
    setOpenWarehouseDialog(true);
  };

  const closeMappingDialog = () => {
    setMappingDialogOpen(false);
  };

  const openMappingDialog = () => {
    setMappingDialogOpen(true);
  };

  return (
    <Drawer anchor={anchor} open={open} onClose={onClose}>
      {warehouse.warehouseDetail && (
        <div className="znect__warehouse-drawer__container">
          <h2>{warehouse.warehouseDetail.name}</h2>
          <h4>{warehouse.warehouseDetail.street1}</h4>
          <div className="znect__warehouse-drawer__control">
            <div className="green_chip">Active</div>
            <button onClick={handleEdit}>Edit</button>
          </div>
          <Divider style={{ marginTop: "10px" }} />
          <h5>Address Informations</h5>
          <div className="znect__warehouse-drawer__desc-container">
            <div className="znect__warehouse-drawer__desc-container__content">
              <p className="znect__warehouse-drawer__items-one">
                Warehouse Name:
              </p>
              <p className="znect__warehouse-drawer__items-two">
                {warehouse.warehouseDetail.name}
              </p>
            </div>
            <div className="znect__warehouse-drawer__desc-container__content">
              <p className="znect__warehouse-drawer__items-one">
                Warehouse ID:
              </p>
              <p className="znect__warehouse-drawer__items-two">
                {warehouse.warehouseDetail.warehouse_id}
              </p>
            </div>
            <div className="znect__warehouse-drawer__desc-container__content">
              <p className="znect__warehouse-drawer__items-one">
                Street Address:
              </p>
              <p className="znect__warehouse-drawer__items-two">
                {warehouse.warehouseDetail.street1}
              </p>
            </div>
            <div className="znect__warehouse-drawer__desc-container__content">
              <p className="znect__warehouse-drawer__items-one">City:</p>
              <p className="znect__warehouse-drawer__items-two">
                {warehouse.warehouseDetail.city}
              </p>
            </div>
            <div className="znect__warehouse-drawer__desc-container__content">
              <p className="znect__warehouse-drawer__items-one">State:</p>
              <p className="znect__warehouse-drawer__items-two">
                {warehouse.warehouseDetail.state}
              </p>
            </div>
            <div className="znect__warehouse-drawer__desc-container__content">
              <p className="znect__warehouse-drawer__items-one">Zipcode:</p>
              <p className="znect__warehouse-drawer__items-two">
                {warehouse.warehouseDetail.zip}
              </p>
            </div>
            <div className="znect__warehouse-drawer__desc-container__content">
              <p className="znect__warehouse-drawer__items-one">Country:</p>
              <p className="znect__warehouse-drawer__items-two">
                {warehouse.warehouseDetail.country}
              </p>
            </div>
            <div className="znect__warehouse-drawer__desc-container__content">
              <p className="znect__warehouse-drawer__items-one">
                Phone Number:
              </p>
              <p className="znect__warehouse-drawer__items-two">
                {warehouse.warehouseDetail.phone_number}
              </p>
            </div>
          </div>
          <Divider style={{ marginTop: "10px" }} />
          <h5>Other Informations</h5>
          <div className="znect__warehouse-drawer__desc-container">
            <div className="znect__warehouse-drawer__desc-container__content">
              <p className="znect__warehouse-drawer__items-one">Seller Id:</p>
              <p className="znect__warehouse-drawer__items-two">
                {warehouse.warehouseDetail.seller_partner_id}
              </p>
            </div>
            <div className="znect__warehouse-drawer__desc-container__content">
              <p className="znect__warehouse-drawer__items-one">Add Odoo:</p>
              <p className="znect__warehouse-drawer__items-two">
                {warehouse.warehouseDetail.add_odoo}
              </p>
            </div>
            <div className="znect__warehouse-drawer__desc-container__content">
              <p className="znect__warehouse-drawer__items-one">
                Cut Off Time:
              </p>
              <p className="znect__warehouse-drawer__items-two">
                {warehouse.warehouseDetail.cut_off}
              </p>
            </div>
            <div className="znect__warehouse-drawer__desc-container__content">
              <p className="znect__warehouse-drawer__items-one">Pickup Day:</p>
              <p className="znect__warehouse-drawer__items-two">
                {warehouse.warehouseDetail.pickup_day}
              </p>
            </div>
            <div className="znect__warehouse-drawer__desc-container__content">
              <p className="znect__warehouse-drawer__items-one">
                Warehouse Mappings:
              </p>
              <p
                className="znect__warehouse-drawer__items-two"
                onClick={openMappingDialog}
              >
                <span style={{ color: "#1679AB", cursor: "pointer" }}>
                  {warehouse.warehouseDetail.warehouse_mapping
                    ? `${warehouse.warehouseDetail.warehouse_mapping.length} mappings found`
                    : "0 mappings found"}
                </span>
              </p>
            </div>
          </div>
          <WarehouseDialogForm
            open={openWarehouseDialog}
            clear={null}
            handleClose={handleFormClose}
            warehouseDetails={warehouse.warehouseDetail}
            onDataSubmit={(warehouseData) => {
              submitFormData(warehouseData);
            }}
          />
          <WarehouseMappingDialog
            open={mappingDialogOpen}
            handleClose={closeMappingDialog}
            rows={
              warehouse.warehouseDetail.warehouse_mapping
                ? warehouse.warehouseDetail.warehouse_mapping
                : []
            }
            columns={[
              { key: "buyer_partner_id", title: "Partner ID" },
              { key: "seller_partner_id", title: "Seller ID" },
              { key: "trader_warehouse_id", title: "Trader Warehouse" },
              { key: "seller_warehouse_id", title: "Seller Warehouse" },
            ]}
            options={["Delete"]}
            warehouseId={warehouse.warehouseDetail.warehouse_id}
          />
        </div>
      )}
    </Drawer>
  );
};

export default WarehouseDrawer;
