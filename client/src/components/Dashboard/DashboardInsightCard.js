import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import ImageDashboard from "assets/images/dashboard_card.png";

const DashboardInsightsCard = ({ handleVisualizations, handleDashboards }) => {
  return (
    <Card
      sx={{
        bgcolor: "#3949ab",
        color: "white",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid
            item
            sm={12}
            md={8}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{ color: "white" }}
            >
              Descubre nuevos insights
            </Typography>
            <Typography
              variant="body1"
              fontSize="1rem"
              m={2}
              ml={0}
              pr={2}
              gutterBottom
              sx={{ textAlign: "justify", lineHeight: "1.5rem" }}
            >
              En nuestra aplicación de visualización de datos, podrás descubrir
              información valiosa sobre cualquier tema que te interese. Nuestra
              herramienta te ayudará a encontrar insights únicos y a
              visualizarlos de manera clara y concisa. Además, podrás generar
              gráficos y ver tablas para explorar aún más los datos. ¡Comienza a
              explorar y a descubrir todo lo que nuestra aplicación tiene para
              ofrecer!
            </Typography>
            <Box
              mt={5}
              sx={{ display: "flex", flexGrow: 1, alignItems: "self-end" }}
            >
              <Button
                onClick={handleVisualizations}
                variant="contained"
                sx={{
                  mr: 1,
                  bgcolor: "white",
                  color: "#3949ab",
                  fontWeight: "bold",
                  "&:hover": {
                    bgcolor: "primary",
                    color: "white",
                  },
                }}
              >
                Ver gráficos
              </Button>
              <Button
                onClick={handleDashboards}
                variant="contained"
                sx={{
                  mr: 1,
                  bgcolor: "white",
                  color: "#3949ab",
                  fontWeight: "bold",
                  "&:hover": {
                    bgcolor: "primary",
                    color: "white",
                  },
                }}
              >
                Ver tableros
              </Button>
            </Box>
          </Grid>
          <Grid
            item
            sm={12}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              image={ImageDashboard}
              sx={{
                maxWidth: "90%",
                marginRight: 0,
                display: { xs: "none", sm: "none", md: "block", lg: "block" },
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DashboardInsightsCard;
