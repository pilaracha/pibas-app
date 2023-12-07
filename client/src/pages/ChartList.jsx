import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import useRequest from "common/useRequest";
import { ActivitiesService } from "services/ActivitiesService";
import { PibasService } from "services/PibasService";
import Graphic from "models/Graphic";
import ChartsTemplate from "templates/Charts";
import DefaultTemplate from "templates/Default";
import useSnackbar from "common/useSnackbar";

const ChartList = () => {
  const { idActividad } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { beforeSubmit, afterSubmit, loading } = useRequest();
  const { snackbar, open, close } = useSnackbar(location?.state?.message);

  const [options, setOptions] = React.useState([]);
  const [charts, setCharts] = React.useState([]);

  const handleDefault = () => navigate(`/graficos/${idActividad}/crear`);

  const handleSelection = (activity) => {
    navigate(`/graficos/${activity.id}`);
  };

  React.useEffect(
    () => {
      beforeSubmit();
      if (idActividad) {
        PibasService.getChartsByActivity(idActividad)
          .then((results) => {
            setCharts(results.map((result) => new Graphic(result)));
          })
          .catch((error) => console.log(error))
          .finally(() => afterSubmit());
      } else {
        ActivitiesService.getActivities()
          .then((data) =>
            setOptions(
              data.data.map((activity) => ({
                label: activity.name,
                id: activity.id,
              }))
            )
          )
          .catch((error) => error)
          .finally(() => afterSubmit());
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleDownload = (idChart) => {
    navigate(`${idChart}/exportar`);
  };

  const handleFavorite = (idChart) => {
    PibasService.updateChartFavorite(idChart)
      .then((result) => {
        const updatedChart = new Graphic(result);
        const newCharts = [...charts];
        const chartIndex = newCharts.findIndex(
          (chart) => chart.id === updatedChart.id
        );
        newCharts[chartIndex] = updatedChart;
        setCharts(newCharts);
        open(
          `${updatedChart.name} ${
            updatedChart.isFavorite ? "marcado" : "desmarcado"
          } como favorito`
        );
      })
      .catch((error) => console.log(error));
  };

  const handleAction = (chart) => {
    navigate(`/graficos/${chart.activity}/ver`, {
      state: { idChart: chart.id },
    });
  };

  return (
    <DefaultTemplate loading={loading} snackbar={snackbar} closeSnack={close}>
      <ChartsTemplate
        idActividad={idActividad}
        title={location.state?.activityName}
        options={options}
        charts={charts}
        handleDefault={handleDefault}
        handleSelection={handleSelection}
        buttonActions={{ favorite: handleFavorite, download: handleDownload }}
        handleAction={handleAction}
      />
    </DefaultTemplate>
  );
};

export default ChartList;
