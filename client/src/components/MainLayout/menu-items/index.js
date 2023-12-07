import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import InsightsIcon from "@mui/icons-material/Insights";
import DashboardIcon from "@mui/icons-material/Dashboard";

const menuItems = [
  {
    id: "ROOT",
    title: "Inicio",
    type: "item",
    url: "/",
    icon: <HomeIcon />,
    breadcrumbs: false,
  },
  {
    id: "ACT",
    title: "Actividades",
    type: "item",
    parent: true,
    url: "/actividades",
    icon: <FormatListBulletedIcon />,
    breadcrumbs: false,
  },
  {
    id: "GRAFICOS",
    title: "Graficos",
    type: "item",
    url: "/graficos",
    icon: <InsightsIcon />,
    breadcrumbs: false,
  },
  {
    id: "TABLEROS",
    title: "Tableros",
    type: "item",
    url: "/tableros",
    icon: <DashboardIcon />,
    breadcrumbs: false,
  },
];

export default menuItems;
