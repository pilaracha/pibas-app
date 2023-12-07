import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  dropAreaWrapper: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: "12px",
    padding: "16px",
    height: "75vh",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    // position: "relative",
  },
}));
