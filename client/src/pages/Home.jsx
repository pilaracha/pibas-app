import {
  Alert,
  AlertTitle,
  Box,
  Collapse,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import DashboardInsightsCard from "components/Dashboard/DashboardInsightCard";
import { useNavigate } from "react-router-dom";
import { PibasService } from "services/PibasService";
import Dashboard from "models/Dashboard";
import Graphic from "models/Graphic";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import ChartCard from "components/ChartCard";
import DefaultTemplate from "templates/Default";
import useRequest from "common/useRequest";

const Home = () => {
  const navigate = useNavigate();
  const { loading, beforeSubmit, afterSubmit } = useRequest();

  const [indicators, setIndicators] = React.useState([]);
  const [chartsFavorite, setChartsFavorite] = React.useState([]);
  const [dashboardsFavorite, setDashboardsFavorite] = React.useState([]);
  const [openFavorites, setOpenFavorites] = React.useState(false);

  React.useEffect(() => {
    beforeSubmit();
    PibasService.getHome()
      .then((response) => {
        setIndicators([
          {
            amount: response.totalGraphics,
            label:
              response.totalGraphics === 1
                ? "Gráfico creado"
                : "Gráficos creados",
          },
          {
            amount: response.totalDashboards,
            label:
              response.totalDashboards === 1
                ? "Tablero creado"
                : "Tableros creados",
          },
          {
            amount: response.totalActivities,
            label:
              response.totalActivities === 1
                ? "Actividad creada"
                : "Actividades creadas",
          },
        ]);
        PibasService.getFavoritesCharts()
          .then((charts) => {
            const chartsNew = charts.map((chart) => new Graphic(chart));
            setChartsFavorite(chartsNew);
            PibasService.getFavoriteDashboards()
              .then((dashboards) => {
                setDashboardsFavorite(
                  dashboards.map((dashboard) => new Dashboard(dashboard))
                );
              })
              .catch((error) => console.log(error))
              .finally(() => afterSubmit());
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => console.log(error));
  }, []);

  const handleVisualizations = (event) => {
    // event.preventDefault();
    return navigate("/graficos");
  };

  const handleDashboards = () => navigate("/tableros");

  const handleFavorites = () => {
    setOpenFavorites(!openFavorites);
  };

  return (
    <DefaultTemplate loading={loading}>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} mb={2}>
          <DashboardInsightsCard
            handleVisualizations={handleVisualizations}
            handleDashboards={handleDashboards}
          />
        </Grid>
        <Grid container>
          {indicators.map((indicador, index) => (
            <Grid key={index} item xs={12} sm={6} md={3} mb={1} pr={2}>
              <Alert color="secondary" severity="success">
                <AlertTitle>
                  {indicador.amount} {indicador.label}
                </AlertTitle>
              </Alert>
            </Grid>
          ))}
        </Grid>

        <Grid item xs={12} sm={12} md={12} mb={2}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "background.paper",
              marginTop: "8px",
              borderRadius: "12px",
              padding: "8px",
              paddingLeft: "32px",
              boxShadow:
                "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
                ...(openFavorites && { marginBottom: "8px" }),
              }}
            >
              <IconButton onClick={handleFavorites}>
                {openFavorites ? (
                  <ExpandLess color="secondary" />
                ) : (
                  <ExpandMore color="secondary" />
                )}
              </IconButton>
              <Typography variant="h4"> Mis favoritos </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Collapse in={openFavorites} timeout="auto" unmountOnExit>
                <Grid container spacing={2} columns={2}>
                  {dashboardsFavorite.map((dashboard, index) => (
                    <Grid item xs={1}>
                      <ChartCard
                        key={index}
                        content={dashboard}
                        tablero
                        handleAction={() =>
                          navigate(`/tableros/${dashboard.id}`)
                        }
                      />
                    </Grid>
                  ))}
                  {chartsFavorite.map((chart, index) => (
                    <Grid item xs={1}>
                      <ChartCard
                        key={index}
                        content={chart}
                        handleAction={() =>
                          navigate(`/graficos/${chart.activity}/ver`, {
                            state: { idChart: chart.id },
                          })
                        }
                      />
                    </Grid>
                  ))}
                </Grid>
              </Collapse>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </DefaultTemplate>
  );
};

export default Home;
