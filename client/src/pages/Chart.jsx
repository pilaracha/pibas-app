import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DefaultTemplate from "templates/Default";
import { PibasService } from "services/PibasService";
import useRequest from "common/useRequest";
import ChartTemplate from "templates/Chart";
import Graphic from "models/Graphic";
import { ActivitiesService } from "services/ActivitiesService";
import { getType, handleResults } from "common/helpers/functions";
import { columnTypes, rowTypes } from "common/helpers/types";
import useAlert from "common/useAlert";
import { useRouteLoaderData } from "react-router-dom";

const Chart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activity = useRouteLoaderData("GRAFACT");

  const { beforeSubmit, afterSubmit, loading } = useRequest();
  const { open, close, alert } = useAlert();

  const [chart, setChart] = React.useState(new Graphic({}));
  const [todayChart, setTodayChart] = React.useState();

  const getIndicators = (graphic, results) => {
    const valueX = parseInt(graphic.indicatorX.code);
    const xTask = results.tasks.find((task) => task.id === valueX);
    const x = {
      value: valueX - 1,
      task: {
        name: xTask.name,
        options: xTask.options,
        type: getType(xTask.type, graphic.indicatorX.type, columnTypes),
      },
    };

    const valueY = parseInt(graphic.indicatorY.code);
    const y = {
      value: valueY - 1,
      type: graphic.indicatorY.type,
    };

    const chartToCopy = {
      index: 0,
      name: graphic.name,
      errors: {},
      indicatorX: valueX,
      indicatorY: valueY,
      breakdown: Boolean(graphic.indicatorZ),
      indicatorZ: null,
      type: graphic.type,
      tasksTypes: {
        column: { ...x.task.type },
        row: y.type,
      },
      data: null,
      base64: null,
    };

    let z;
    if (graphic.indicatorZ) {
      const zValue = parseInt(graphic.indicatorZ);
      const zTask = results.tasks.find((task) => task.id === zValue);
      z = {
        value: zValue - 1,
        task: {
          name: zTask.name,
          options: zTask.options,
          type: zTask.type,
        },
      };
      chartToCopy.indicatorZ = zValue;
      Object.assign(chartToCopy.tasksTypes, { breakdown: { id: zTask.type } });
    }

    return { x: x, y: y, z: z, chart: chartToCopy };
  };

  React.useEffect(
    () => {
      if (location.state?.idChart) {
        beforeSubmit();
        PibasService.getChart(location.state?.idChart)
          .then((data) => {
            const graphic = new Graphic(data);
            setChart(graphic);
            ActivitiesService.getResults(activity.code)
              .then((resultsData) => {
                const results = resultsData.data;
                const indicators = getIndicators(graphic, results);
                const data = handleResults(
                  indicators.x,
                  indicators.y,
                  indicators.z,
                  results.results
                );
                setTodayChart({
                  type: graphic.type,
                  data: data,
                  chart: indicators.chart,
                });
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error))
          .finally(() => afterSubmit());
      } else {
        navigate("/graficos");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleCopy = () => {
    navigate(`/graficos/${chart.activity}/crear`, {
      state: { chart: todayChart.chart },
    });
  };

  const handleDelete = () => {
    PibasService.deleteChart(chart.id)
      .then((result) =>
        navigate(`/graficos/${chart.activity}`, {
          state: { message: `Se ha eliminado ${chart.name}` },
        })
      )
      .catch((error) => console.log(error));
  };

  return (
    <DefaultTemplate loading={loading} alert={alert}>
      <ChartTemplate
        chart={chart}
        todayChart={todayChart}
        handleCopy={handleCopy}
        handleDelete={() =>
          open({
            title: `Desea eliminar ${chart.name}?`,
            handleAccept: handleDelete,
            handleCancel: close,
          })
        }
      />
    </DefaultTemplate>
  );
};

export default Chart;
