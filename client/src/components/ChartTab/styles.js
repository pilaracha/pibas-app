import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles((theme) => ({
  indicator: {
    display: "none",
  },
  itemRoot: {
    minHeight: "unset",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "0px",
    borderBottomLeftRadius: "0px",

    "&:not(:first-of-type)": {
      marginLeft: -1,
    },
    background: "#f7f7f7",
    opacity: 1,
  },
  itemSelected: {
    borderBottomWidth: 0,
    background: "#ffffff",
    "& $wrapper": {
      opacity: 1,
    },
  },
  itemWrapper: {
    opacity: 0.7,
  },
  cardRoot: {
    borderTopLeftRadius: 0,
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  buttonsElement: {
    padding: 8,
  },
}));
