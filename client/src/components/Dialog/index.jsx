import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogMUI from "@mui/material/Dialog";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { types } from "common/helpers/types";

/**
 * Componente para renderizar un diálogo que permite elegir la forma a tratar un tipo de dato
 * @function Dialog
 * @param {function} onClose - Función a ejectuar cuando se cierra, ya se cancelando o aceptando
 * @param {string} value - Valor de inicialización
 * @param {boolean} open - Estado abierto/cerrado del dialog
 * @param {string} type - Tipo de dato sobre el que se trabaja en el dialog
 * @return JSXElement
 */

const Dialog = (props) => {
  const { onClose, open, typeValue, typeTitle, typesOptions, ...other } = props;
  const [value, setValue] = React.useState(typeValue);
  const radioGroupRef = React.useRef(null);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleSubmit = () => {
    onClose(value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <DialogMUI
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>{typeTitle}</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label={typeTitle}
          name={typeTitle}
          value={value}
          onChange={handleChange}
        >
          {typesOptions.map((option) => (
            <FormControlLabel
              key={option.value}
              control={<Radio />}
              {...option}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit}>Aceptar</Button>
      </DialogActions>
    </DialogMUI>
  );
};

export default Dialog;
