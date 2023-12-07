import { createBrowserRouter } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import InsightsIcon from "@mui/icons-material/Insights";
import DashboardIcon from "@mui/icons-material/Dashboard";

import Layout from "../templates/Layout";
import Home from "../pages/Home";
import Activities from "pages/Activities";
import Chart from "pages/Chart";
import ChartList from "pages/ChartList";
import ChartsCreate from "pages/ChartsCreate";
import DashboardList from "pages/DashboardList";
import Dashboard from "pages/Dashboard";
import DashboardCreate from "pages/DashboardCreate";
import Login from "pages/Login";

import { PibasService } from "services/PibasService";
import { ActivitiesService } from "services/ActivitiesService";
import { default as DashboardModel } from "models/Dashboard";
import KanbanBoard from "components/KanbanBoard";
import Export from "pages/Export";

const routes = (user) =>
  createBrowserRouter([
    {
      path: "/",
      element: <Layout user={user} />,
      children: [
        {
          path: "/",
          element: <Home />,
          handle: {
            crumb: () => ({ element: <HomeIcon />, to: "/" }),
          },
        },
        {
          id: "ACT",
          path: "actividades",
          element: <Activities />,
          handle: {
            crumb: () => ({
              element: <FormatListBulletedIcon />,
              to: "actividades",
            }),
          },
        },
        {
          id: "GRAFS",
          path: "graficos",
          handle: {
            crumb: (data) => ({
              element: <InsightsIcon />,
              to: "graficos",
            }),
          },
          children: [
            {
              index: true,
              element: <ChartList />,
            },
            {
              id: "GRAFACT",
              path: ":idActividad",
              // VER DE MEJORAR ESTO
              loader: async ({ params }) => {
                return ActivitiesService.getActivities()
                  .then((results) => {
                    const activity = results.data.find(
                      (result) => result.id === parseInt(params.idActividad)
                    );
                    return activity || {};
                  })
                  .catch((error) => error);
              },
              handle: {
                crumb: (data) => {
                  return {
                    to: `/graficos/${data.id}`,
                    element: data.name || "",
                  };
                },
              },
              children: [
                {
                  index: true,
                  element: <ChartList />,
                },
                {
                  id: "ADDGRAF",
                  path: "crear",
                  element: <ChartsCreate />,
                  handle: {
                    crumb: () => ({ element: "Crear" }),
                  },
                },
                {
                  id: "IDGRAF",
                  path: "ver",
                  element: <Chart />,
                  handle: {
                    crumb: () => ({ element: "Ver" }),
                  },
                },
                {
                  id: "exp",
                  title: "Exportar",
                  path: ":idChart/exportar",
                  element: <Export />,
                  handle: {
                    crumb: () => ({ element: "Exportar" }),
                  },
                },
              ],
            },
          ],
        },
        {
          id: "DASH",
          path: "tableros",
          title: "Tableros",
          handle: {
            crumb: () => ({ element: <DashboardIcon />, to: "tableros" }),
          },
          children: [
            {
              index: true,
              element: <DashboardList />,
            },
            {
              id: "DASHID",
              path: ":idDashboard",
              element: <Dashboard />,
              loader: async ({ params }) => {
                return PibasService.getDashboard(params.idDashboard)
                  .then((result) => {
                    return new DashboardModel(result);
                  })
                  .catch((error) => error);
              },
              handle: {
                crumb: (data) => {
                  return {
                    to: `/tableros/${data.id}`,
                    element: data.name || "",
                  };
                },
              },
            },
            {
              id: "DASHADD",
              title: "Crear Tableros",
              path: "crear",
              element: <DashboardCreate />,
              handle: {
                crumb: () => ({ element: "Crear" }),
              },
            },
            {
              id: "DASHEDIT",
              title: "Editar Tablero",
              path: ":idDashboard/editar",
              element: <DashboardCreate />,
              handle: {
                crumb: () => ({ element: "Editar" }),
              },
            },
            {
              id: "export",
              title: "Exportar",
              path: ":idDashboard/exportar",
              element: <Export />,
              handle: {
                crumb: () => ({ element: "Exportar" }),
              },
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

export default routes;
