import Api from "./ApiService";

export const ActivitiesService = {
  getActivities: async () => await Api.fetch(`/dehia/activities`),

  getTasks: async (codeActivity) =>
    await Api.fetch(`/dehia/tasks/${codeActivity}/`),

  getResults: async (codeActivity) =>
    await Api.fetch(`/dehia/results/${codeActivity}/`),
};
