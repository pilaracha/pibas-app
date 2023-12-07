import AbcRoundedIcon from "@mui/icons-material/AbcRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import PinIcon from "@mui/icons-material/Pin";
import { selectDefault } from "./defaults";

export const STR = "STR";
export const INT = "INT";
export const DATE = "DATE";

export const types = {
  STR: "Texto",
  INT: "Número",
  DATE: "Fecha",
};

export const iconTypes = {
  STR: <AbcRoundedIcon />,
  INT: <PinIcon />,
  DATE: <EventRoundedIcon />,
};

export const columnTypes = {
  STR: [
    {
      value: selectDefault,
      label: "Texto",
    },
  ],
  INT: [
    {
      value: selectDefault,
      label: "Número",
    },
  ],
  DATE: [
    {
      value: selectDefault,
      label: "Fecha",
    },
    {
      value: "year",
      label: "Año",
    },
  ],
};

export const rowTypes = [
  {
    value: selectDefault,
    label: "Recuento",
  },
  {
    value: "media",
    label: "Media",
  },
  {
    value: "avg",
    label: "Porcentaje",
  },
];
