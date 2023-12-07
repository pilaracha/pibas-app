import Api from "./ApiService";

export const PibasService = {

  /* Home */

  getHome: async () => await Api.fetch("/pibas/home"),

  /* Charts */

  getCharts: async () => await Api.fetch("/pibas/graficos"),

  getChartsByActivity: async (idActivity) =>
    await Api.fetch(`/pibas/graficos/actividad/${idActivity}`),

  getChart: async (idGraphic) =>
    await Api.fetch(`/pibas/graficos/${idGraphic}`),

  createChart: async (data) => await Api.fetch(`/pibas/graficos`, "POST", data),

  updateChartFavorite: async (idChart) =>
    await Api.fetch(`/pibas/graficos/${idChart}/favorito`, "PUT"),

  getFavoritesCharts: async () =>
    await Api.fetch(`/pibas/graficos/user/favoritos`),

  deleteChart: async (idChart) =>
    await Api.fetch(`/pibas/graficos/${idChart}`, "DELETE"),

  searchCharts: async (queryParams) =>
    await Api.fetch(`/pibas/graficos/buscar?${queryParams}`, "GET"),

  /* Dashboards */

  getDashboards: async () => await Api.fetch(`/pibas/tableros`),

  getDashboard: async (idADashboard) =>
    await Api.fetch(`/pibas/tableros/${idADashboard}`),

  createDashboard: async (data) =>
    await Api.fetch(`/pibas/tableros`, "POST", data),

  updateDashboard: async (idADashboard, data) =>
    await Api.fetch(`/pibas/tableros/${idADashboard}`, "PUT", data),

  updateDashboardFavorite: async (idADashboard) =>
    await Api.fetch(`/pibas/tableros/${idADashboard}/favorito`, "PUT"),

  getFavoriteDashboards: async () =>
    await Api.fetch(`/pibas/tableros/user/favoritos`),

  deleteDashboard: async (idADashboard) =>
    await Api.fetch(`/pibas/tableros/${idADashboard}`, "DELETE"),
};
