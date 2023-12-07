import React from "react";

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import FunctionsIcon from "@mui/icons-material/Functions";
import Dialog from "components/Dialog";
import { useStyles } from "./styles";
import Chart from "components/Chart";
import Chip from "components/Chip";
import { chartOptions } from "data/chartData";
import { columnTypes, iconTypes, rowTypes, types } from "common/helpers/types";

const ChartForm = ({
  chart,
  tasks,
  handleUpdateChart,
  handleClear,
  handleApply,
  handleBase64,
}) => {
  const [editName, setEditName] = React.useState(false);
  const [openColumn, setOpenColumn] = React.useState(false);
  const [openRow, setOpenRow] = React.useState(false);

  const classes = useStyles({ edit: editName });

  const {
    data,
    tasksTypes,
    indicatorX,
    indicatorY,
    breakdown,
    indicatorZ,
    type,
    name,
    errors,
    index,
  } = chart;

  const [chartName, setChartName] = React.useState(name);

  const updateType = (field, newValue) => {
    let type = newValue;
    if (field === "column") {
      const columnType = tasksTypes["column"];
      const newType = columnTypes[columnType.id].find(
        (type) => type.value === newValue
      );
      type = { id: columnType.id, ...newType };
    }

    const types = { ...tasksTypes };
    types[field] = type;
    handleUpdateChart(types, "tasksTypes", chart);
  };

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <div className={classes.elementMainIndicadores}>
        <Typography variant="h3" classes={{ root: classes.rootTypography }}>
          Indicadores
        </Typography>
        <Divider />
        <div className={classes.elementContainer}>
          <div className={classes.elementRow}>
            <FormControl fullWidth>
              <Typography variant="subtitle1" gutterBottom>
                Tipo de Gráfico*
              </Typography>
              <TextField
                select
                value={type}
                error={errors.type}
                onChange={(event) => {
                  handleUpdateChart(event.target.value, "type", chart);
                }}
                fullWidth
                size="small"
              >
                {chartOptions &&
                  chartOptions.map((option, index) => (
                    <MenuItem
                      key={index}
                      value={option.value}
                      disabled={option.disabled}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
              </TextField>
              <FormHelperText error={errors.type}>{errors.type}</FormHelperText>
            </FormControl>
          </div>
          <div className={classes.elementRow}>
            <Typography variant="subtitle1" gutterBottom>
              Medidas
            </Typography>
          </div>
          <div className={classes.elementRow}>
            <FormControl fullWidth>
              <InputLabel id="columns-label">Columna*</InputLabel>
              <Select
                labelId="columns-label"
                id="columns"
                value={indicatorX || ""}
                label="Columna"
                multiline={true}
                error={errors.indicatorX}
                disabled={Boolean(indicatorX)}
                {...(indicatorX && {
                  renderValue: (selected) => {
                    const task = tasks.find(
                      (item) => item.id === parseInt(selected)
                    );
                    const taskType = tasksTypes["column"];
                    return (
                      <React.Fragment>
                        <Chip
                          label={task?.name}
                          icon={iconTypes[taskType.id]}
                          color="primary"
                          sx={{
                            height: "auto",
                            "& .MuiChip-label": {
                              display: "block",
                              whiteSpace: "normal",
                            },
                          }}
                          dialog={{
                            setOpen: setOpenColumn,
                          }}
                          onDelete={() =>
                            handleUpdateChart(null, "indicatorX", chart)
                          }
                        />

                        {openColumn && (
                          <Dialog
                            open={openColumn}
                            onClose={(newValue) => {
                              newValue && updateType("column", newValue);
                              return setOpenColumn(false);
                            }}
                            typeValue={taskType.value}
                            typeTitle={types[taskType.id]}
                            typesOptions={columnTypes[taskType.id]}
                          />
                        )}
                      </React.Fragment>
                    );
                  },
                })}
                onChange={(event) => {
                  handleUpdateChart(event.target.value, "indicatorX", chart);
                }}
              >
                {tasks.map((field, index) => {
                  return (
                    <MenuItem key={index} value={field.id}>
                      {field.name}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText error={errors.indicatorX}>
                {errors.indicatorX}
              </FormHelperText>
            </FormControl>
          </div>
          <div className={classes.elementRow}>
            <FormControl fullWidth>
              <InputLabel id="rows-label">Filas*</InputLabel>
              <Select
                labelId="rows-label"
                id="rows"
                value={indicatorY || ""}
                error={errors.indicatorY}
                label="Filas"
                disabled={Boolean(indicatorX)}
                {...(indicatorY && {
                  renderValue: (selected) => {
                    const task = tasks.find((item) => item.id === selected);
                    const type = tasksTypes["row"];
                    return (
                      <React.Fragment>
                        <Chip
                          label={task?.name}
                          icon={<FunctionsIcon />}
                          color="primary"
                          sx={{
                            height: "auto",
                            "& .MuiChip-label": {
                              display: "block",
                              whiteSpace: "normal",
                            },
                          }}
                          dialog={{
                            setOpen: setOpenRow,
                          }}
                          onDelete={() =>
                            handleUpdateChart(null, "indicatorX", chart)
                          }
                        />

                        {openRow && (
                          <Dialog
                            open={openRow}
                            onClose={(newValue) => {
                              newValue && updateType("row", newValue);
                              return setOpenRow(false);
                            }}
                            typeValue={type}
                            typeTitle={"Función"}
                            typesOptions={rowTypes}
                          />
                        )}
                      </React.Fragment>
                    );
                  },
                })}
              >
                {tasks.map((field, index) => {
                  return (
                    <MenuItem key={index} value={field.id}>
                      {field.name}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText error={errors.indicatorY}>
                {errors.indicatorY}
              </FormHelperText>
            </FormControl>
          </div>
          <div className={classes.elementRow}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={breakdown}
                  onChange={(event) => {
                    handleUpdateChart(event.target.checked, "breakdown", chart);
                  }}
                />
              }
              label="Desglozar"
            />
          </div>
          {breakdown && (
            <div className={classes.elementRow}>
              <FormControl fullWidth>
                <InputLabel id="breakdown-label">Desglozar*</InputLabel>
                <Select
                  labelId="breakdown-label"
                  id="breakdown"
                  value={indicatorZ || ""}
                  label="Desglozar"
                  error={errors.indicatorZ}
                  disabled={Boolean(indicatorZ)}
                  {...(indicatorZ && {
                    renderValue: (selected) => {
                      const task = tasks.find((item) => item.id === selected);
                      const type = tasksTypes["breakdown"];
                      return (
                        <Chip
                          label={task?.name}
                          icon={iconTypes[type.id]}
                          color="primary"
                          sx={{
                            height: "auto",
                            "& .MuiChip-label": {
                              paddingTop: "8px",
                              paddingBottom: "8px",
                              display: "block",
                              whiteSpace: "normal",
                            },
                          }}
                          onDelete={() =>
                            handleUpdateChart(null, "indicatorZ", chart)
                          }
                        />
                      );
                    },
                  })}
                  onChange={(event) => {
                    handleUpdateChart(event.target.value, "indicatorZ", chart);
                  }}
                >
                  {tasks.map((field, index) => {
                    return (
                      <MenuItem key={index} value={field.id}>
                        {field.name}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText error={errors.indicatorZ}>
                  {errors.indicatorZ}
                </FormHelperText>
              </FormControl>
            </div>
          )}
        </div>
        <div className={classes.buttonsContainer}>
          <div className={classes.buttonsElement}>
            <Button
              onClick={() => handleClear(index)}
              variant="outlined"
              color="secondary"
              size="small"
            >
              Limpiar
            </Button>
          </div>
          <div className={classes.buttonsElement}>
            <Button
              onClick={() => handleApply(index)}
              variant="contained"
              color="secondary"
              size="small"
            >
              Aplicar
            </Button>
          </div>
        </div>
      </div>

      <Divider orientation="vertical" flexItem />
      <div className={classes.elementMain}>
        <div className={classes.textField}>
          <TextField
            fullWidth
            value={chartName}
            inputProps={{
              readOnly: !editName,
            }}
            InputProps={{
              disableUnderline: !editName,
              classes: {
                input: classes.outlinedInput,
              },
            }}
            onChange={(event) => {
              setChartName(event.target.value);
            }}
            variant="standard"
          />
          <IconButton
            onClick={() => {
              handleUpdateChart(chartName, "name", chart);
              setEditName(!editName);
            }}
          >
            {editName ? (
              <DoneOutlinedIcon color="success" />
            ) : (
              <EditOutlinedIcon color="secondary" />
            )}
          </IconButton>
        </div>
        <Divider />
        {data && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              padding: 16,
            }}
          >
            <Chart
              type={type}
              data={data}
              index={index}
              handleBase64={handleBase64}
            />
          </div>
        )}
      </div>
    </Box>
  );
};

export default ChartForm;
