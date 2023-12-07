import React from "react";

import ActivitiesTable from "components/ActivitiesTable";
import { ActivitiesService } from "services/ActivitiesService";

import { useNavigate } from "react-router-dom";
import useRequest from "common/useRequest";
import DefaultTemplate from "templates/Default";

const Activities = () => {
  const navigate = useNavigate();

  const { beforeSubmit, afterSubmit, loading } = useRequest();

  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    beforeSubmit();
    ActivitiesService.getActivities()
      .then((data) => {
        if (!data.error) {
          setRows(data.data);
        } else {
          console.error("Error al obtener actividades:", data.message);
        }
      })
      .catch((error) => console.error("Error al obtener los datos:", error))
      .finally(() => afterSubmit());
  }, []);

  const handleClick = (id) => {
    navigate(`/graficos/${id}`);
  };

  return (
    <DefaultTemplate loading={loading}>
      <ActivitiesTable rows={rows} handleClick={handleClick} />
    </DefaultTemplate>
  );
};

export default Activities;
