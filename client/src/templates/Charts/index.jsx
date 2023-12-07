import { Autocomplete, TextField, Typography, Modal, Box } from "@mui/material";

import ChartListTemplate from "templates/ChartList";
import { useStyles } from "./styles";

const ChartsTemplate = ({
  idActividad,
  charts,
  options,
  handleDefault,
  handleSelection,
  handleAction,
  buttonActions,
}) => {
  const classes = useStyles();

  const styles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
    p: 4,
  };

  return (
    <>
      {idActividad ? (
        <ChartListTemplate
          charts={charts}
          handleDefault={handleDefault}
          handleAction={handleAction}
          buttonActions={buttonActions}
        />
      ) : (
        <Modal
          open={true}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styles}>
            <Typography variant="h5" classes={{ root: classes.title }}>
              Para continuar, debe seleccionar una actividad
            </Typography>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={options || []}
              sx={{ width: 300 }}
              onChange={(event, newValue) => {
                event.preventDefault();
                newValue && handleSelection(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!options}
                  helperText={!options && "No hay actividades asociadas"}
                  label="Actividades"
                />
              )}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
            />
          </Box>
        </Modal>
      )}
    </>
  );
};

export default ChartsTemplate;
