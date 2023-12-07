import React from "react";
import { Chip as ChipMUI } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import IconButton from "@mui/material/IconButton";

const Chip = ({ label, icon, variant, color, onDelete, dialog, ...props }) => {
  const [typeIcon, setTypeIcon] = React.useState(icon);

  return (
    <React.Fragment>
      <ChipMUI
        {...props}
        size="medium"
        label={label}
        variant={variant}
        color={color}
        icon={
          dialog ? (
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                dialog.setOpen(true);
              }}
              onMouseEnter={() =>
                setTypeIcon(<EditRoundedIcon fontSize="small" />)
              }
              onMouseLeave={() => setTypeIcon(icon)}
            >
              {typeIcon}
            </IconButton>
          ) : (
            typeIcon
          )
        }
        {...(onDelete && { onDelete: onDelete })}
      />
    </React.Fragment>
  );
};

export default Chip;
