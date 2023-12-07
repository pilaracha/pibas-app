import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles((theme) => ({
  defaultContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    marginRight: "25%",
    marginLeft: "25%",
    marginBottom: "5%",
  },
  title: {
    marginBottom: "1em",
  },
  appBar: {
    alignItems: "flex-end",
  },
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  },
}));
