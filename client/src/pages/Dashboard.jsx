import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useRequest from "common/useRequest";
import DefaultTemplate from "templates/Default";
import ChartListTemplate from "templates/ChartList";
import { Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { PibasService } from "services/PibasService";
import useAlert from "common/useAlert";

const Dashboard = () => {
  const navigate = useNavigate();
  const loaderData = useLoaderData();

  const { loading, beforeSubmit, afterSubmit } = useRequest();
  const { open, close, alert } = useAlert();

  const [charts, setCharts] = React.useState([]);

  React.useEffect(() => {
    beforeSubmit();
    loaderData && setCharts(loaderData.graphics);

    const timer = setTimeout(() => {
      afterSubmit();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = () => {
    PibasService.deleteDashboard(loaderData.id)
      .then((result) => {
        navigate(`/tableros`, {
          state: {
            message: `Se ha eliminado ${loaderData.name}`,
          },
        });
      })
      .catch((error) => console.log(error));
  };

  const handleAction = (chart) => {
    navigate(`/graficos/${chart.activity}/ver`, {
      state: { idChart: chart.id },
    });
  };

  return (
    <DefaultTemplate loading={loading} alert={alert}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Fab
          onClick={() =>
            open({
              title: `Desea eliminar ${loaderData.name}?`,
              handleAccept: handleDelete,
              handleCancel: close,
            })
          }
          size="small"
          color="error"
          aria-label="delete"
          sx={{ marginRight: "8px", marginBottom: "6px" }}
        >
          <DeleteOutlinedIcon />
        </Fab>
        <Fab
          onClick={() => navigate("editar")}
          size="small"
          color="secondary"
          aria-label="edit"
          sx={{ marginBottom: "6px" }}
        >
          <EditIcon />
        </Fab>
      </div>
      <ChartListTemplate handleAction={handleAction} charts={charts} />
    </DefaultTemplate>
  );
};

export default Dashboard;
