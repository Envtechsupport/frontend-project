import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.reducer";
import orderReducer from "./orders/order.reducer";
import inventorylistReducer from "./inventorylist/inventorylist.reducer";
import productReducer from "./products/products.reducer";
import warehousesReducer from "./warehouses/warehouses.reducer";
import usersReducer from "./users/users.reducer";
import znectReducer from "./znect/znect.reducer";
import reportReducer from "./reports/reports.reducer";

const rootReducer = () =>
  combineReducers({
    auth: authReducer,
    order: orderReducer,
    inventory: inventorylistReducer,
    product: productReducer,
    warehouse: warehousesReducer,
    users: usersReducer,
    znect: znectReducer,
    report: reportReducer,
  });

export default rootReducer;
