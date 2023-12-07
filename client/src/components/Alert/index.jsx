import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

const AlertDialog = ({ open, title, handleCancel, handleAccept }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ fontSize: "1rem" }} id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogActions>
          {handleCancel && <Button onClick={handleCancel}>Cancelar</Button>}
          {handleAccept && (
            <Button onClick={handleAccept} autoFocus>
              Aceptar
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
