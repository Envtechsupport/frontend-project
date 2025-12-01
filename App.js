import "./App.css";
import {
  Dashboard,
  Login,
  Orders,
  OrderDetails,
  InventoryList,
  Products,
  Warehouses,
  Settings,
  ZnectOperations,
  Reports,
} from "./containers";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Orders />} />
            <Route path="order/:poNumber" element={<OrderDetails />} />
            <Route path="inventory" element={<InventoryList />} />
            <Route path="products" element={<Products />} />
            <Route path="warehouses" element={<Warehouses />} />
            <Route path="settings" element={<Settings />} />
            <Route path="znectoperations" element={<ZnectOperations />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
