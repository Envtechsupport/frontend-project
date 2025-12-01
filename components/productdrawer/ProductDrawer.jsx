import React, { useState } from "react";
import "./productdrawer.css";
import { useSelector, useDispatch } from "react-redux";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ProductDialogForm from "../productdialogform/ProductDialogForm";
import { updateProduct } from "../../redux/reducers/products/products.thunks";
import { SkuMappingDialog } from "../../components";

const ProductDrawer = ({ anchor, open, onClose }) => {
  const product = useSelector((state) => state.product);
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [mappingDialogOpen, setMappingDialogOpen] = useState(false);
  const dispatch = useDispatch();

  const handleFormClose = () => {
    setOpenProductDialog(false);
  };

  const handleEdit = () => {
    setOpenProductDialog(true);
  };

  const submitFormData = (productData) => {
    dispatch(updateProduct(productData));
  };

  const closeMappingDialog = () => {
    setMappingDialogOpen(false);
  };

  const openMappingDialog = () => {
    setMappingDialogOpen(true);
  };

  return (
    <Drawer anchor={anchor} open={open} onClose={onClose}>
      {product.productDetail && (
        <div className="znect__product-drawer__container">
          <h2>{product.productDetail.sku}</h2>
          <h4>{product.productDetail.name}</h4>
          <div className="znect__product-drawer__control">
            <div className="green_chip">
              {product.productDetail.is_active === "YES"
                ? "Active"
                : "Not Active"}
            </div>
            <button
              onClick={() => {
                handleEdit();
              }}
            >
              Edit
            </button>
          </div>
          <Divider style={{ marginTop: "10px" }} />
          <h5>General Informations</h5>
          <div className="znect__product-drawer__desc-container">
            <div className="znect__product-drawer__desc-container__content">
              <p className="znect__product-drawer__items-one">Product SKU:</p>
              <p className="znect__product-drawer__items-two">
                {product.productDetail.sku}
              </p>
            </div>
            <div className="znect__product-drawer__desc-container__content">
              <p className="znect__product-drawer__items-one">Product Name:</p>
              <p className="znect__product-drawer__items-two">
                {product.productDetail.name}
              </p>
            </div>
            <div className="znect__product-drawer__desc-container__content">
              <p className="znect__product-drawer__items-one">Product UPC:</p>
              <p className="znect__product-drawer__items-two">
                {product.productDetail.upc}
              </p>
            </div>
            <div className="znect__product-drawer__desc-container__content">
              <p className="znect__product-drawer__items-one">Price:</p>
              <p className="znect__product-drawer__items-two">
                {product.productDetail.price}
              </p>
            </div>
            <div className="znect__product-drawer__desc-container__content">
              <p className="znect__product-drawer__items-one">Manufacturer:</p>
              <p className="znect__product-drawer__items-two">
                {product.productDetail.manufacturer}
              </p>
            </div>
            <div className="znect__product-drawer__desc-container__content">
              <p className="znect__product-drawer__items-one">Multibox:</p>
              <p className="znect__product-drawer__items-two">
                {product.productDetail.is_multibox}
              </p>
            </div>
            <div className="znect__product-drawer__desc-container__content">
              <p className="znect__product-drawer__items-one">Ship Type:</p>
              <p className="znect__product-drawer__items-two">
                {product.productDetail.ship_type}
              </p>
            </div>
            <div className="znect__product-drawer__desc-container__content">
              <p className="znect__product-drawer__items-one">Odoo PID:</p>
              <p className="znect__product-drawer__items-two">
                {product.productDetail.odoo_pid}
              </p>
            </div>
            <div className="znect__product-drawer__desc-container__content">
              <p className="znect__product-drawer__items-one">Odoo UOM:</p>
              <p className="znect__product-drawer__items-two">
                {product.productDetail.odoo_uom}
              </p>
            </div>
            <div className="znect__product-drawer__desc-container__content">
              <p className="znect__product-drawer__items-one">Threshold:</p>
              <p className="znect__product-drawer__items-two">
                {product.productDetail.threshold}
              </p>
            </div>
            <div className="znect__product-drawer__desc-container__content">
              <p className="znect__product-drawer__items-one">LTL Threshold:</p>
              <p className="znect__product-drawer__items-two">
                {product.productDetail.ltl_threshold}
              </p>
            </div>
            <div className="znect__product-drawer__desc-container__content">
              <p className="znect__product-drawer__items-one">Class Number:</p>
              <p className="znect__product-drawer__items-two">
                {product.productDetail.class_num}
              </p>
            </div>
            <div className="znect__product-drawer__desc-container__content">
              <p className="znect__product-drawer__items-one">Sku Mappings:</p>
              <p
                className="znect__product-drawer__items-two"
                onClick={openMappingDialog}
              >
                <span style={{ color: "#1679AB", cursor: "pointer" }}>
                  {product.productDetail.mappings
                    ? `${product.productDetail.mappings.length} mappings found`
                    : "0 mappings found"}
                </span>
              </p>
            </div>
          </div>
          <Divider />
          <h5>Product Dimenions</h5>
          <div className="znect__product-drawer__desc-container">
            <div className="znect__product-drawer__desc-container__content">
              <p className="znect__product-drawer__items-one">
                Product Dimenions:
              </p>
              <p className="znect__product-drawer__items-two">
                {product.productDetail.length} in x{" "}
                {product.productDetail.width} in x{" "}
                {product.productDetail.height} in,{" "}
                {product.productDetail.weight} lbs
              </p>
            </div>
            <div className="znect__product-drawer__desc-container__content">
              <p className="znect__product-drawer__items-one">
                Shipping Dimenions:
              </p>
              <p className="znect__product-drawer__items-two">
                {product.productDetail.shipping_length} in x{" "}
                {product.productDetail.shipping_width} in x{" "}
                {product.productDetail.shipping_height} in,{" "}
                {product.productDetail.shipping_weight} lbs
              </p>
            </div>
            <div className="znect__product-drawer__desc-container__content">
              <p className="znect__product-drawer__items-one">
                Casepack Quantity:
              </p>
              <p className="znect__product-drawer__items-two">
                {product.productDetail.case_pack_quantity}
              </p>
            </div>
            <div className="znect__product-drawer__desc-container__content">
              <p className="znect__product-drawer__items-one">
                Package Configuration:
              </p>
              <p className="znect__product-drawer__items-two">
                {product.productDetail.package_config}
              </p>
            </div>
          </div>
          <ProductDialogForm
            open={openProductDialog}
            clear={null}
            handleClose={handleFormClose}
            productDetails={product.productDetail}
            onDataSubmit={(productData) => {
              submitFormData(productData);
            }}
          />
          <SkuMappingDialog
            open={mappingDialogOpen}
            handleClose={closeMappingDialog}
            rows={
              product.productDetail.mappings
                ? product.productDetail.mappings
                : []
            }
            columns={[
              { key: "partner_id", title: "Partner ID" },
              { key: "partner_sku", title: "Partner SKU" },
            ]}
            options={["Delete"]}
            mainSku={product.productDetail.sku}
          />
        </div>
      )}
    </Drawer>
  );
};

export default ProductDrawer;
