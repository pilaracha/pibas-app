import PropTypes from "prop-types";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Drawer, Typography, useMediaQuery } from "@mui/material";

// third-party
// import PerfectScrollbar from 'react-perfect-scrollbar';
// import { BrowserView, MobileView } from 'react-device-detect';

// project imports
import MenuList from "./MenuList";
import LogoSection from "../LogoSection";
// import MenuCard from "./MenuCard";
// import { drawerWidth } from 'store/constant';

// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));

  const drawer = (
    <>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Box sx={{ display: "flex", p: 2, mx: "auto" }}>
          <LogoSection />
        </Box>
      </Box>
      <Box sx={{ paddingLeft: 3, paddingTop: 3, paddingBottom: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold" fontSize="0.85rem" >Menu</Typography>
      </Box>
      <MenuList />
    </>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 }, width: matchUpMd ? 260 : "auto" }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant={matchUpMd ? "persistent" : "temporary"}
        anchor="left"
        open={drawerOpen}
        onClose={drawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: 260,
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRight: "none",
            [theme.breakpoints.up("md")]: {
              top: "88px",
            },
          },
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object,
};

export default Sidebar;
