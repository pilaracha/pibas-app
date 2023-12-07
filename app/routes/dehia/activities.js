const fetch = require("node-fetch");
const { dehiaURL } = require("../../../config/dev");

module.exports = async (req, res, next) => {
  try {
    const activitiesResponse = await fetch(
      `${dehiaURL}/api/v1.0/actividades/user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + req.session.dehiaToken,
        },
      }
    );
    const activitiesJson = await activitiesResponse.json();

    if (activitiesJson.status == 400) {
      res.status(401).json();
      return;
    }

    if (!activitiesJson.results) {
      res.json({ success: true, data: [] });
      return;
    }

    const activities = activitiesJson.results;
    const filteredActivities = activities.filter(
      (activity) => activity.definitiva === true
    );

    const data = await Promise.all(
      filteredActivities.map(async (activity) => {
        const tasksResponse = await fetch(
          `${dehiaURL}/api/v1.0/actividades/${activity.id}/tareas`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + req.session.dehiaToken,
            },
          }
        );
        const tasksJson = await tasksResponse.json();
        const tasks = tasksJson.results;

        return {
          id: activity.id,
          name: activity.nombre,
          code: activity.codigo,
          objective: activity.objetivo,
          domain: activity.dominio.nombre,
          planning_type: activity.tipo_planificacion.nombre,
          status: activity.estado.nombre,
          tasks: tasks.map((item) => {
            return {
              id: item.id,
              name: item.nombre,
              code: item.codigo,
            };
          }),
        };
      })
    );

    res.json({ success: true, data: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hubo un error al procesar la solicitud." });
  }
};
