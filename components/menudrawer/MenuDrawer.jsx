import * as React from "react";
import { Link } from "react-router-dom";
import "./menudrawer.css";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListAltIcon from "@mui/icons-material/ListAlt";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AssessmentIcon from "@mui/icons-material/Assessment";

const drawerWidth = 240;

const icons = [
  <ListAltIcon />,
  <InventoryIcon />,
  <CategoryIcon />,
  <WarehouseIcon />,
  <SettingsOutlinedIcon />,
  <AssessmentIcon />,
];

const routes = [
  "",
  "inventory",
  "products",
  "warehouses",
  "znectoperations",
  "reports",
];

const MenuDrawer = () => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar className="znect__menu-toolbar">
        <h2 className="gradient_text">Envelor</h2>
      </Toolbar>
      <Divider />
      <List>
        {[
          "Orders",
          "Inventory",
          "Products",
          "Warehouses",
          "Znect Operations",
          "Reports",
        ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={`/${routes[index]}`}>
              <ListItemIcon>{icons[index]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default MenuDrawer;
