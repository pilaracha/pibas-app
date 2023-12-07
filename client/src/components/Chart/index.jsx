import React from "react";
import { Chart as BaseChart } from "react-chartjs-2";

// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";

import { Chart as ChartRegister } from "chart.js";

import annotationPlugin from "chartjs-plugin-annotation";

ChartRegister.register(annotationPlugin);

const Chart = ({ type, data, index, handleBase64 }) => {
  const options = {
    responsive: true,
    animation: {
      duration: 1500,
      ...(handleBase64 && {
        onComplete: function (animation) {
          const base = this.toBase64Image();
          handleBase64(base, index);
        },
      }),
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
      ...(data.annotation && { annotation: { ...data.annotation } }),
    },
    ...(data.options && { ...data.options }),
  };

  return type !== -1 && data ? (
    <BaseChart
      type={type}
      options={options}
      data={{ labels: data.labels, datasets: data.datasets }}
    />
  ) : (
    <></>
  );
};

export default Chart;
