import makeStyles from "@mui/styles/makeStyles";
import themePalette from "themes/palette";

export const useStyles = makeStyles((theme) => {
  return {
    elementMain: {
      display: "flex",
      flexDirection: "column",
      width: "50%", // Establece el ancho al 50%
      marginRight: "1em", // Agrega espacio entre los elementos
    },
    elementContainer: {
      display: "flex",
    },
    containerChart: {
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
    rootTypography: {
      paddingLeft: 16,
      paddingBottom: 8,
      paddingTop: 16,
      color: themePalette(theme).text.hint,
    },
    buttonsContainer: {
      display: "flex",
      justifyContent: "space-between",
      padding: 16,
    },
    imageWrapper: {
      maxWidth: '100%',
      padding: '0.5em'
    }
  };
});
