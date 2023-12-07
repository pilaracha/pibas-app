import { getDate } from "common/helpers/functions";
import useAlert from "common/useAlert";
import useRequest from "common/useRequest";
import Dashboard from "models/Dashboard";
import Graphic from "models/Graphic";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ActivitiesService } from "services/ActivitiesService";
import { PibasService } from "services/PibasService";
import DashboardCreateTemplate from "templates/DashboardCreate";
import DefaultTemplate from "templates/Default";

const DashboardCreate = () => {
  const navigate = useNavigate();
  const { idDashboard } = useParams();
  const { loading, beforeSubmit, afterSubmit } = useRequest();
  const { open, close, alert } = useAlert();

  const [title, setTitle] = React.useState(`Tablero ${getDate(new Date())}`);
  const [dashboard, setDashboard] = React.useState([]);

  const [openSave, setOpenSave] = React.useState(false);

  const [openFiltrar, setOpenFiltrar] = React.useState(false);
  const [name, setName] = React.useState(null);
  const [activity, setActivity] = React.useState(null);
  const [actOptions, setActOptions] = React.useState([]);
  const [favorite, setFavorite] = React.useState(false);

  const filterAlert = {
    open: openFiltrar,
    name: name,
    handleName: setName,
    activity: activity,
    actOptions: actOptions,
    handleActivity: setActivity,
    favorite: favorite,
    handleFavorite: setFavorite,
  };

  React.useEffect(() => {
    beforeSubmit();
    ActivitiesService.getActivities()
      .then((response) =>
        setActOptions(
          response.data.map((d) => ({
            id: d.id,
            label: d.name,
          }))
        )
      )
      .catch((error) => console.log(error));
    PibasService.getCharts()
      .then((results) => {
        let charts = results.map((result) => new Graphic(result));
        charts = charts.map((chart) => {
          chart.columnId = "graphics";
          return chart;
        });
        if (idDashboard) {
          PibasService.getDashboard(idDashboard)
            .then((dashboardData) => {
              const dashboard = new Dashboard(dashboardData);
              setTitle(dashboard.name);

              const dashboardIDs = dashboard.graphics.map(
                (graphic) => graphic.id
              );

              charts = charts.map((chart) => {
                dashboardIDs.includes(chart.id) &&
                  (chart.columnId = "dashboard");
                return chart;
              });
            })
            .catch((error) => console.log(error))
            .finally(() => afterSubmit());
        }
        setDashboard(charts);
      })
      .catch((error) => console.log(error))
      .finally(() => !idDashboard && afterSubmit());
  }, []);

  const navigateTableros = (state) => {
    navigate(
      "/tableros",
      state && {
        state,
      }
    );
  };

  const handleFiltrar = () => {
    setOpenFiltrar(!openFiltrar);
  };

  const cancelFilter = () => {
    PibasService.getCharts()
      .then((results) => {
        let charts = results.map((result) => new Graphic(result));
        const dashboardIDs = dashboard
          .filter((graphic) => graphic.columnId === "dashboard")
          .map((graphic) => graphic.id);
        charts = charts.map((chart) => {
          !dashboardIDs.includes(chart.id)
            ? (chart.columnId = "graphics")
            : (chart.columnId = "dashboard");
          return chart;
        });
        setDashboard(charts);
        setName(null);
        setActivity(null);
        setFavorite(false);
        setOpenFiltrar(false);
      })
      .catch((error) => console.log(error));
  };

  const acceptFilter = () => {
    let queryParam = [];
    name && queryParam.push(`name=${name}`);
    activity && queryParam.push(`activity=${activity.id}`);
    favorite && queryParam.push(`is_favorite=${favorite}`);
    queryParam = queryParam.join("&");

    PibasService.searchCharts(queryParam)
      .then((result) => {
        const filteredGraphics = dashboard.filter(
          (graphic) => graphic.columnId !== "graphics"
        );
        result.forEach((r) => {
          const graphic = new Graphic(r);
          graphic.columnId = "graphics";
          filteredGraphics.push(graphic);
        });
        setDashboard(filteredGraphics);
        setOpenFiltrar(false);
      })
      .catch((error) => console.log(error));
  };

  const closeSave = () => {
    setOpenSave(false);
  };

  const handleSave = () => {
    const dashboardImages = dashboard.filter(
      (graphic) => graphic.columnId === "dashboard"
    );
    if (!dashboardImages.length) {
      open({
        title: `No se asignaron gráficos al tablero`,
        handleAccept: close,
      });
    } else {
      setOpenSave(true);
    }
  };

  const handleAcceptSave = () => {
    const navigate = () =>
      navigateTableros({
        openSnack: true,
        message: `Se ha ${idDashboard ? "editado" : "creado"} el tablero`,
      });

    const dataRequest = {
      name: title,
      graphics: dashboard
        .filter((graphic) => graphic.columnId === "dashboard")
        .map((graphic) => graphic.id),
    };

    const request = idDashboard
      ? PibasService.updateDashboard(idDashboard, dataRequest)
      : PibasService.createDashboard(dataRequest);

    request.then((response) => navigate()).catch((error) => console.log(error));
  };

  return (
    <DefaultTemplate loading={loading} alert={alert}>
      <DashboardCreateTemplate
        idDashboard={idDashboard}
        handleFiltrar={handleFiltrar}
        filterAlert={filterAlert}
        cancelFilter={cancelFilter}
        acceptFilter={acceptFilter}
        openSave={openSave}
        closeSave={closeSave}
        handleAcceptSave={handleAcceptSave}
        title={title}
        setTitle={setTitle}
        images={dashboard}
        setImages={setDashboard}
        handleSave={handleSave}
        handleCancel={() => navigateTableros()}
      />
    </DefaultTemplate>
  );
};

export default DashboardCreate;
