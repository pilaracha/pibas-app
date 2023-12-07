import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ActivitiesService } from "services/ActivitiesService";
import ChartForm from "components/ChartForm";
import ChartTab from "components/ChartTab";
import { columnTypes, rowTypes } from "common/helpers/types";
import { getType, handleResults } from "common/helpers/functions";
import useRequest from "common/useRequest";
import DefaultTemplate from "templates/Default";
import { PibasService } from "services/PibasService";
import { selectDefault } from "common/helpers/defaults";
import useAlert from "common/useAlert";
import { useRouteLoaderData } from "react-router-dom";

const ChartsCreate = () => {
  const { idActividad } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const activity = useRouteLoaderData("GRAFACT");

  const [tasksData, setTasksData] = React.useState([]);

  const { afterSubmit, beforeSubmit, loading } = useRequest();
  const { alert, open, close } = useAlert();

  React.useEffect(
    () => {
      if (!idActividad) {
        navigate("/graficos");
      } else {
        beforeSubmit();
        ActivitiesService.getTasks(activity.code)
          .then((data) => {
            setTasksData(data.data);
            location.state?.chart && updateChart(location.state.chart);
          })
          .catch((error) => console.error("Error al obtener los datos:", error))
          .finally(() => afterSubmit());
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const initialChart = (index) => {
    return {
      index: index,
      name: `Gráfico ${index + 1}`,
      errors: {},
      indicatorX: "",
      indicatorY: "",
      breakdown: false,
      indicatorZ: "",
      type: "-1",
      tasksTypes: {},
      data: null,
    };
  };

  const [charts, setCharts] = React.useState([initialChart(0)]);
  const [base64, setBase64] = React.useState([]);

  const handleBase64 = (base64, index) => {
    setBase64((prevBase64) => {
      prevBase64[index] = base64;
      return prevBase64;
    });
  };

  const handleUpdateChart = (value, field, chart) => {
    const newChart = { ...chart };

    newChart[field] = value;
    if (field === "indicatorX") {
      newChart["indicatorY"] = value;
      if (value) {
        const columnTask = tasksData.find((task) => task.id === value);

        newChart.tasksTypes["column"] = getType(
          columnTask.type,
          selectDefault,
          columnTypes
        );
        newChart.tasksTypes["row"] = selectDefault;
      }
    } else if (field === "indicatorZ" && value) {
      const breakdownTask = tasksData.find((task) => task.id === value);
      newChart.tasksTypes["breakdown"] = {
        id: breakdownTask.type,
      };
    }

    if (!["type", "name"].includes(field) && newChart.data) {
      newChart.data = null;
    }

    delete newChart.errors[field];
    updateChart(newChart);
  };

  const handleClear = (index) => {
    updateChart(initialChart(index));
  };

  const updateChart = (chart) => {
    const chartsNew = [...charts];
    chartsNew[chart.index] = chart;
    setCharts(chartsNew);
  };

  const handleNewTab = () => {
    const lastChart = charts[charts.length - 1];
    const newIndex = lastChart.index + 1;
    updateChart(initialChart(newIndex));
  };

  const handleApply = (index) => {
    const chart = { ...charts[index] };

    const keys = ["indicatorX", "type"];

    chart.breakdown && keys.push("indicatorZ");

    const newErrors = { ...chart.errors };
    keys.forEach((key) => {
      if (chart[key] === initialChart(index)[key]) {
        newErrors[key] = "Este campo es requerido";
      }
    });

    if (Object.keys(newErrors).length) {
      chart.errors = newErrors;
      updateChart(chart);
    } else {
      ActivitiesService.getResults(activity.code)
        .then((data) => {
          const results = data.data.results;

          const columnTask = tasksData.find(
            (task) => task.id === chart.indicatorX
          );

          const column = {
            value: chart.indicatorX - 1,
            task: {
              name: columnTask.name,
              options: columnTask.options,
              type: chart.tasksTypes["column"],
            },
          };

          const row = {
            value: chart.indicatorY - 1,
            type: chart.tasksTypes["row"],
          };

          let z;
          if (chart.breakdown) {
            z = {
              value: chart.indicatorZ - 1,
              task: tasksData.find((task) => task.id === chart.indicatorZ),
            };
          }

          chart.data = handleResults(column, row, z, results);
          updateChart(chart);
        })
        .catch((error) => console.error("Error al obtener los datos:", error));
    }
  };

  const handleDeleteTab = (index) => {
    if (charts.length > 1) {
      const filteredCharts = charts.filter((chart) => chart.index !== index);
      const reorderCharts = filteredCharts.map((chart, index) => {
        chart.index = index;
        return chart;
      });
      setCharts(reorderCharts);
    }
  };

  const chartComponents = charts.map((chart, index) => {
    return (
      <ChartForm
        key={index}
        index={index}
        tasks={tasksData}
        handleUpdateChart={handleUpdateChart}
        handleClear={handleClear}
        handleApply={handleApply}
        handleDeleteTab={handleDeleteTab}
        chart={chart}
        handleBase64={handleBase64}
      />
    );
  });

  const handleAccept = () => {
    const results = charts.map((chart) => {
      return {
        name: chart.name,
        activity: idActividad,
        indicator_x: {
          code: chart.indicatorX,
          type: chart.tasksTypes.column.value,
        },
        indicator_y: {
          code: chart.indicatorY,
          type: chart.tasksTypes.row,
        },
        indicator_z: chart.indicatorZ,
        type: chart.type,
        image: {
          data: base64[chart.index],
        },
      };
    });
    PibasService.createChart(results)
      .then(() => {
        const message =
          charts.length > 1
            ? "Se han creado los gráficos"
            : "Se ha creado el gráfico";
        navigate(`/graficos/${idActividad}`, {
          state: { message: message },
        });
      })
      .catch((error) => console.log(error));
  };

  const handleSave = () => {
    charts.some((chart) => !Boolean(base64[chart.index]))
      ? open({ title: "Existen gráficos sin indicadores aplicados" })
      : open({
          title: "Desea guardar?",
          handleAccept: handleAccept,
          handleCancel: close,
        });
  };

  return (
    <DefaultTemplate loading={loading} alert={alert}>
      <ChartTab
        charts={chartComponents}
        handleNewTab={handleNewTab}
        handleDeleteTab={handleDeleteTab}
        handleSave={handleSave}
      />
    </DefaultTemplate>
  );
};

export default ChartsCreate;
