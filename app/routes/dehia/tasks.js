const fetch = require("node-fetch");
const { dehiaURL } = require("../../../config/dev");

function isNumber(str) {
  return !isNaN(Number(str));
}

function isDate(str) {
  const dateFormat = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  return dateFormat.test(str);
}

function analyzeArray(arr) {
  const allNumbers = arr.every((element) => isNumber(String(element)));
  if (allNumbers) {
    return "INT";
  }

  const allDates = arr.every((element) => isDate(String(element)));
  if (allDates) {
    return "DATE";
  }

  return "STR";
}

module.exports = async (req, res, next) => {
  try {
    response = await fetch(
      `${dehiaURL}/api/v1.0/resultados?code=${req.params.id_activity}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + req.session.dehiaToken,
        },
      }
    );
    const data = await response.json();

    if (data.status == 400) {
      res.status(401).json();
      return;
    }

    if (data.error_code) {
      return next({
        status: 400,
        message: "Authentication failed. User not found.",
      });
    } else {
      const tasks = data.tareas;
      const results = data.respuestas;

      const mapCodeToName = (task, code) => {
        const element = task.extra.elements.find((el) => el.code == code);
        return element ? element.name : code;
      };

      const processedTasks = tasks.map((task, taskIndex) => {
        const taskResults = results
          .map((result) => result[taskIndex])
          .flatMap((result) => {
            if (task.tipo.tiene_opciones) {
              return Array.isArray(result)
                ? result.map((code) => mapCodeToName(task, code))
                : [mapCodeToName(task, result)];
            } else {
              return result;
            }
          });

        return {
          id: taskIndex + 1,
          name: task.nombre,
          options: task.extra.elements ? task.extra.elements : [],
          type: analyzeArray(
            taskResults.filter((element) => element !== "<Sin respuesta>")
          ),
        };
      });

      res.json({ success: true, data: processedTasks });
    }
  } catch (error) {
    return next({
      status: 401,
      message: "Authentication failed.",
    });
  }
};
