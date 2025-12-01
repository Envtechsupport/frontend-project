import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const user = localStorage.getItem("user");
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
