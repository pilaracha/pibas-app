import {
  Autocomplete,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  TextField,
} from "@mui/material";

const FilterAlert = ({
  open,
  name,
  handleName,
  activity,
  actOptions,
  handleActivity,
  favorite,
  handleFavorite,
  handleCancel,
  handleAccept,
}) => {
  // por nombre, por actividad y por si es favorito
  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
    >
      <DialogTitle sx={{ fontSize: "1rem" }}>Filtrar gráficos</DialogTitle>
      <DialogContent dividers>
        <FormControl fullWidth margin="dense">
          <TextField
            label="Nombre del gráfico"
            value={name}
            onChange={(event) => handleName(event.target.value)}
          />
        </FormControl>
        <FormControl fullWidth margin="dense">
          <Autocomplete
            value={activity}
            options={actOptions}
            onChange={(event, newValue) => {
              handleActivity(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Actividad" />
            )}
          />
        </FormControl>
        <FormControl margin="dense">
          <FormControlLabel
            control={
              <Checkbox
                checked={favorite}
                onChange={(event) => handleFavorite(event.target.checked)}
              />
            }
            label="Favorito"
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Borrar
        </Button>
        <Button onClick={handleAccept}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterAlert;
