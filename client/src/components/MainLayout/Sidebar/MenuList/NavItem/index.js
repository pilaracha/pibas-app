import { forwardRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";

// project imports
import { MENU_OPEN, SET_MENU } from "store/actions";
import config from "config";

// assets

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item, level = 0 }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customization);
  const matchesSM = useMediaQuery(theme.breakpoints.down("lg"));

  // const Icon = item.icon;
  // const itemIcon = item?.icon ? (
  //   <Icon stroke={1.5} size="1.3rem" />
  // ) : (
  //   <FiberManualRecordIcon
  //     sx={{
  //       width:
  //         customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
  //       height:
  //         customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
  //     }}
  //     fontSize={level > 0 ? "inherit" : "medium"}
  //   />
  // );

  let itemTarget = "_self";
  if (item.target) {
    itemTarget = "_blank";
  }

  let listItemProps = {
    component: forwardRef((props, ref) => (
      <Link
        ref={ref}
        {...props}
        to={`${config.basename}${item.url}`}
        target={itemTarget}
      />
    )),
  };
  // if (item?.external) {
  //   listItemProps = { component: "a", href: item.url, target: itemTarget };
  // }

  const itemHandler = (id) => {
    dispatch({ type: MENU_OPEN, id });
    if (matchesSM) dispatch({ type: SET_MENU, opened: false });
  };

  // active menu item on page load

  const location = useLocation();

  useEffect(() => {
    let pathname = location.pathname;

    if (pathname !== "/") {
      pathname = `/${pathname.split("/")[1]}`;
    }

    if (item.url === pathname && item.id !== customization.isOpen[0]) {
      const id = item.id;
      dispatch({ type: MENU_OPEN, id });
    }
  }, [location]);

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        borderRadius: `${customization.borderRadius}px`,
        mb: 0.5,
        alignItems: "flex-start",
        backgroundColor: "inherit",
        padding: 1.5,
        // py: level > 1 ? 1 : 1.25,
        // pl: `${level * 24}px`,
      }}
      selected={customization.isOpen.findIndex((id) => id === item.id) > -1}
      onClick={() => itemHandler(item.id)}
    >
      <ListItemIcon sx={{ my: "auto", minWidth: !item?.icon ? 18 : 36 }}>
        {item.icon}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography
            variant={
              customization.isOpen.findIndex((id) => id === item.id) > -1
                ? "h5"
                : "body1"
            }
            color="inherit"
          >
            {item.title}
          </Typography>
        }
      />
    </ListItemButton>
  );
};
export default NavItem;
