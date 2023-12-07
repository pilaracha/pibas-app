import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles((theme) => {
  return {
    elementMain: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    elementMainIndicadores: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      maxWidth: "40%",
    },
    elementContainer: {
      marginLeft: 24,
      marginRight: 24,
    },
    elementRow: {
      marginTop: 16,
    },
    rootTypography: {
      paddingLeft: 16,
      paddingBottom: 8,
      paddingTop: 16,
    },
    outlinedInput: {
      color: "#616161",
      fontSize: "1.25rem",
      // lineHeight: "1.334em",
      fontWeight: 500,
    },
    itemDiv: {
      padding: 4,
    },
    buttonsContainer: {
      display: "flex",
      justifyContent: "flex-end",
    },
    buttonsElement: {
      padding: 8,
    },
    textField: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingLeft: 8,
      paddingRight: 16,
      paddingTop: 8,
    },
  };
});
