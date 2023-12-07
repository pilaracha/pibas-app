import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardsTemplate from "templates/Dashboards";
import DefaultTemplate from "templates/Default";
import useRequest from "common/useRequest";
import { PibasService } from "services/PibasService";
import Dashboard from "models/Dashboard";
import useSnackbar from "common/useSnackbar";

const DashboardList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, beforeSubmit, afterSubmit } = useRequest();
  const { snackbar, open, close } = useSnackbar(location?.state?.message);

  const [dashboards, setDashboards] = React.useState([]);

  React.useEffect(() => {
    beforeSubmit();
    PibasService.getDashboards()
      .then((results) => {
        setDashboards(results.map((result) => new Dashboard(result)));
      })
      .catch((error) => console.log(error))
      .finally(() => afterSubmit());
  }, []);

  const handleDefault = () => {
    navigate("/tableros/crear");
  };

  const handleAction = (tablero) => {
    navigate(`${tablero.id}`, { state: { idDashboard: tablero.id } });
  };

  const handleDownload = async (idDashboard) => {
    navigate(`${idDashboard}/exportar`);
  };

  const handleFavorite = (idDashboard) => {
    PibasService.updateDashboardFavorite(idDashboard)
      .then((result) => {
        const updatedDashboard = new Dashboard(result);
        const newDashboards = [...dashboards];
        const dashboardIndex = newDashboards.findIndex(
          (dashboard) => dashboard.id === updatedDashboard.id
        );
        newDashboards[dashboardIndex] = updatedDashboard;
        setDashboards(newDashboards);
        open(
          `${updatedDashboard.name} ${
            updatedDashboard.isFavorite ? "marcado" : "desmarcado"
          } como favorito`
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <DefaultTemplate loading={loading} snackbar={snackbar}>
      <DashboardsTemplate
        tableros={dashboards}
        handleDefault={handleDefault}
        handleAction={handleAction}
        buttonActions={{ favorite: handleFavorite, download: handleDownload }}
      />
    </DefaultTemplate>
  );
};

export default DashboardList;
