import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  dropAreaWrapper: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: "12px",
    padding: "16px",
    margin: "0.9em",
    marginBottom: "0",
    height: "65vh",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  emptyMessage: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  },
}));
