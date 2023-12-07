import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles((theme) => ({
  cardRootDefault: {
    display: "block",
    textAlign: "center",
    padding: 64,
    "&.MuiPaper-root.MuiCard-root": {
      backgroundColor: "rgb(238 240 243)",
    },
  },

  container: {
    // display: "inline-grid",
  },
  element: {
    margin: 8,
  },
  iconRoot: {
    background: "#FAFAFA",
    borderRadius: "50%",
    padding: 8,
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
  },
  actionsRoot: {
    justifyContent: "flex-end",
    padding: 8,
  },
}));
