import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    marginRight: "25%",
    marginLeft: "25%",
    marginTop: "5%",
  },
  title: {
    marginBottom: "5%",
  },
  appBar: {
    alignItems: "flex-end",
  },
}));

export default useStyles;
