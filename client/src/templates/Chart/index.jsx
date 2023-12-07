import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Tooltip,
  Typography,
} from "@mui/material";
import Chart from "components/Chart";
import clsx from "clsx";
import { useStyles } from "./styles";
import { getDate } from "common/helpers/functions";

const ChartTemplate = ({ chart, todayChart, handleCopy, handleDelete }) => {
  const classes = useStyles();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.paper",
        paddingBottom: "32px",
        borderRadius: "12px",
        // boxShadow:
        //   "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
      }}
    >
      <div className={classes.elementContainer}>
        <div className={classes.elementMain}>
          <Typography variant="h4" classes={{ root: classes.rootTypography }}>
            {chart.name} al {getDate(chart.creationDate)}
          </Typography>
          <Divider />
          <div className={classes.elementContainer}>
            <img src={chart.src} alt={chart.name} className={classes.imageWrapper}></img>
          </div>
        </div>

        <Divider orientation="vertical" flexItem />
        <div className={classes.elementMain}>
          <div>
            <Typography variant="h4" classes={{ root: classes.rootTypography }}>
              {chart.name} al día de hoy
            </Typography>
            <Divider />
          </div>
          <div
            className={clsx(classes.elementContainer, {
              [classes.containerChart]: !todayChart,
            })}
          >
            {todayChart ? (
              <Chart type={todayChart.type} data={todayChart.data} />
            ) : (
              <CircularProgress />
            )}
          </div>
        </div>
      </div>
      <Divider />
      <div className={classes.buttonsContainer}>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Eliminar gráfico
        </Button>
        <Tooltip
          title={`Crear un nuevo gráfico a partir de los indicadores de ${chart.name} `}
        >
          <Button variant="contained" onClick={handleCopy}>
            Copiar indicadores
          </Button>
        </Tooltip>
      </div>
    </Box>
  );
};

export default ChartTemplate;
