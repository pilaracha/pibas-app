import { backgroundColors, selectDefault } from "./defaults";
import { DATE, INT } from "./types";

export const getType = (type, value, options) => {
  return {
    id: type,
    ...options[type].find((type) => type.value === value),
  };
};

export const sortLabels = (labels, columnType) =>
  columnType.id === INT
    ? labels.sort(function (a, b) {
        return a - b;
      })
    : labels.sort();

export const taskReduce = (value, options, results) => {
  let groupBy = [];
  if (options.length) {
    groupBy = options.map((option) => option.name);
  } else {
    results.forEach((result) => {
      const rta = result[value];
      const label = groupBy.find((label) => label === rta);
      if (!label) {
        groupBy.push(rta);
      }
    });
  }
  return groupBy;
};

export const calculateAvg = (currencies, total) => {
  return ((currencies * 100) / total).toFixed(2);
};

export const parseYear = (results, value) => {
  return results.map((result) => {
    const values = result[value].split("/").reverse();
    const date = new Date(...values);
    !isNaN(date) && (result[value] = date.getFullYear());
    return result;
  });
};

/**
 *
 * @param {object} column { value: id value of column, task: associated task }
 * @param {object} row { value: id value of row, type: id and value of row type }
 * @param {object (optional)} z  { value: id value of z, task: associated task }
 * @param {array} results
 * @returns object { labels, dataset }
 */

export const handleResults = (column, row, z, results) => {
  const isYear =
    column.task.type.id === DATE && column.task.type.value !== selectDefault;

  isYear && (results = parseYear(results, column.value));

  const labels = sortLabels(
    taskReduce(column.value, column.task.options, results),
    column.task.type
  );

  let rowsData = [];

  const handleData = (valueZ = null) =>
    labels.map((label) => {
      const currencies = results.filter((result) => {
        const rta = result[column.value];
        const rtaIsLabel = Array.isArray(rta)
          ? Boolean(rta.find((r) => r === label))
          : rta === label;

        if (valueZ) {
          let rtaZ = result[z.value];
          if (z.task.type === INT) {
            rtaZ = parseInt(rtaZ);
          }
          const rtaIsZ = Array.isArray(rtaZ)
            ? Boolean(rtaZ.find((r) => r === valueZ))
            : rtaZ === valueZ;
          return rtaIsLabel && rtaIsZ;
        } else {
          return rtaIsLabel;
        }
      });

      if (row.type === "avg") {
        return calculateAvg(currencies.length, results.length);
      } else {
        return currencies.length;
      }
    });

  if (z) {
    if (z.task.type === DATE && isYear) {
      results = parseYear(results, z.value);
    }

    const groupBy = sortLabels(
      taskReduce(z.value, z.task.options, results),
      z.task.type
    );

    rowsData = groupBy.map((group, index) => {
      let g = group;
      if (z.task.type === INT) {
        g = parseInt(group);
      }
      return {
        label: g,
        data: handleData(g),
        backgroundColor: backgroundColors[index],
      };
    });
  } else {
    rowsData.push({
      label: column.task.name,
      data: handleData(),
      backgroundColor: [...backgroundColors.slice(0, labels.length)],
    });
  }

  const data = {
    labels: labels,
    datasets: rowsData,
  };

  row.type === "avg" &&
    Object.assign(data, {
      options: {
        scales: {
          y: {
            ticks: {
              callback: function (val) {
                return `${this.getLabelForValue(val)}%`;
              },
            },
          },
        },
      },
    });

  row.type === "media" &&
    Object.assign(data, {
      annotation: {
        annotations: {
          box1: {
            type: "line",
            borderColor: "grey",
            borderWidth: 2,
            scaleID: "y",
            value: results.length / labels.length,
          },
        },
      },
    });

  [20, 21].includes(column.value + 1) &&
    Object.assign(data, {
      options: {
        scales: {
          x: {
            ticks: {
              callback: function (val, index) {
                const value = this.getLabelForValue(val);

                if (value.length > 25) {
                  return value.slice(0, 25) + "..."; //truncate
                } else {
                  return value;
                }
              },
            },
          },

          y: {},
        },
      },
    });

  return data;
};

export const toSrc = (imageData) => {
  return `${Buffer.from(imageData, "base64")}`;
};

export const parseGraphics = (graphics) => {
  return graphics.map((graphic) => {
    graphic.src = toSrc(graphic.image.data);
    delete graphic.image;
    return graphic;
  });
};

export const getDate = (newDate, separator = "-") => {
  if (newDate) {
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${date}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${year}`;
  } else {
    return null;
  }
};
