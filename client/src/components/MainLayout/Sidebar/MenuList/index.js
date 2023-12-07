import { List } from "@mui/material";
import menuItem from "../../menu-items";
import NavItem from "./NavItem";

const MenuList = () => {
  const navItems = menuItem.map((item) => {
    return <NavItem key={item.id} item={item} nivel={1} />;
  });
  return <List sx={{ paddingX: "12px" }}>{navItems}</List>;
};

export default MenuList;
