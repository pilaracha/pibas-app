import React, { useState } from "react";
import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  ButtonBase,
  Avatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

// project imports
import useLogin from "common/useLogin";
import { AuthService } from "services/AuthService";
import LogoSection from "../LogoSection";

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
  const { signOut } = useLogin();
  const navigate = useNavigate();
  const theme = useTheme();

  const currentUser = JSON.parse(localStorage.getItem("currentUserPIBAS"));

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    const googleResponse = await signOut();
    if (googleResponse) {
      AuthService.logout();
      navigate("/login");
    }
  };

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: "flex",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
      >
        <Box
          component="span"
          sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
        >
          <LogoSection />
        </Box>
        <ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
          <MenuIcon
            color="secondary"
            size="1.3rem"
            onClick={handleLeftDrawerToggle}
          />
        </ButtonBase>
      </Box>
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
        <ButtonBase
          sx={{ borderRadius: "12px", overflow: "hidden" }}
          onClick={handleMenuOpen}
        >
          <Avatar
            sx={{ bgcolor: theme.palette.secondary["dark"], color: "white" }}
            alt={currentUser.username.toUpperCase()}
            src="/broken-image.jpg"
          />
        </ButtonBase>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </Box>

      {/* header search */}
      {/* <SearchSection /> */}
      {/* <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} /> */}
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func,
};

export default Header;
