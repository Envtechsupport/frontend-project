import React from "react";
import { Outlet } from "react-router-dom";
import "./dashboard.css";
import { NavBar, MenuDrawer } from "../../components";

const Dashboard = () => {
  return (
    <div className="znect__dashboard-container">
      <MenuDrawer />
      <div className="znect__dashboard-content">
        <NavBar />
        <div className="znect__dashboard-content__main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
