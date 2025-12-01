import React from "react";
import "./navbar.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import actions from "../../redux/reducers/auth/auth.actions";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CustomIcon = styled(AccountCircleIcon)({
  color: "#909090",
});

const NavBar = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    navigate("/login");
    dispatch(actions.authLogout());
  };
  return (
    <div className="znect__navbar-container">
      <p>Dashboard</p>
      <div className="znect__navbar-profile" onClick={handleClick}>
        <CustomIcon className={{ color: "#fff" }} />
        <p>
          {localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user")).name
            : null}
        </p>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link
            to="/settings"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Settings
          </Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default NavBar;
