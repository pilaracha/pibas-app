export const defaultChartOption = {
  value: -1,
  label: "Seleccione una opción",
  disabled: true,
};

export const chartOptions = [
  { ...defaultChartOption },
  {
    value: "bar",
    label: "Barra",
  },
  {
    value: "line",
    label: "Línea",
  },
  {
    value: "pie",
    label: "Torta",
  },
  {
    value: "doughnut",
    label: "Anillo",
  },
];
