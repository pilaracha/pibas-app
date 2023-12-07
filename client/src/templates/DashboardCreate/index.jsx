import React from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  DialogActions,
  Modal,
  Fab,
  Tooltip,
} from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

import { useStyles } from "./styles";
import FilterAlert from "components/FilterAlert";
import KanbanBoard from "components/KanbanBoard";

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
  "& .MuiTextField-root": { width: "100%" },
};

const DashboardCreateTemplate = ({
  idDashboard,
  handleFiltrar,
  filterAlert,
  cancelFilter,
  acceptFilter,
  openSave,
  closeSave,
  handleAcceptSave,
  title,
  setTitle,
  images,
  setImages,
  handleSave,
  handleCancel,
}) => {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.container}>
        <Tooltip title="Filtrar listado">
          <Fab
            onClick={handleFiltrar}
            size="small"
            color="primary"
            aria-label="filtrar"
            sx={{ marginRight: "8px", marginBottom: "6px" }}
          >
            <MenuOpenIcon variant="filled" />
          </Fab>
        </Tooltip>
        {filterAlert?.open && (
          <FilterAlert
            {...filterAlert}
            handleCancel={cancelFilter}
            handleAccept={acceptFilter}
          />
        )}
      </Grid>

      <KanbanBoard images={images} setImages={setImages} />
      <DialogActions>
        <Button variant="outlined" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Aceptar
        </Button>
      </DialogActions>
      <Modal
        open={openSave}
        onClose={closeSave}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={styles}>
          <Typography gutterBottom component="h5">
            {idDashboard ? "Editar tablero" : "Crear nuevo tablero"}
          </Typography>
          <TextField
            id="outlined-helperText"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <DialogActions>
            <Button variant="outlined" onClick={closeSave}>
              Cancelar
            </Button>
            <Button variant="contained" onClick={handleAcceptSave}>
              Aceptar
            </Button>
          </DialogActions>
        </Box>
      </Modal>
    </>
  );
};

export default DashboardCreateTemplate;
