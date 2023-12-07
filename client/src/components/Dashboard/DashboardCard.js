import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PlaylistAddCheckRoundedIcon from "@mui/icons-material/PlaylistAddCheckRounded";

const DashboardCard = ({ amount, label }) => {
  return (
    <Card sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h3">
            {amount}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {label}
          </Typography>
        </CardContent>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", p: 2, pr: 4 }}>
        <PlaylistAddCheckRoundedIcon fontSize="large"></PlaylistAddCheckRoundedIcon>
      </Box>
    </Card>
  );
};

export default DashboardCard;
