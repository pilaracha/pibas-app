import React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { Button, IconButton, Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
// import useStyles from "./styles";

/**
 * Header
 * @function
 * @param {boolean} isSignedIn - Indica si existe un usuario logueado
 * @param {object} handleLogin - Funcion que maneja el login de un usuario
 * @param {object} handleLogin - Funcion que maneja el logout de un usuario
 * @returns {JSX.Element}
 */

const drawerWidth = 240;

const Header = ({ isSignedIn, handleLogin, handleLogout }) => {
  // const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: isSignedIn ? drawerWidth : 0,
      width: isSignedIn ? `calc(100% - ${drawerWidth}px)` : "100%",
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <AppBar
      position="absolute"
      color="secondary"
      // classes={{ root: classes.appBar }}
      open={open}
    >
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          PIBAS
        </Typography>
        <Button
          variant="text"
          color="inherit"
          onClick={() => {
            return isSignedIn ? handleLogout() : handleLogin();
          }}
          // className={classes.button}
          size="large"
        >
          {isSignedIn ? "Logout" : "Login"}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
