import {
  Box,
  DialogActions,
  Divider,
  Fab,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { forwardRef } from "react";
import useStyles from "./styles";
import { EditOutlined } from "@mui/icons-material";
import DoneIcon from "@mui/icons-material/Done";
import DownloadIcon from "@mui/icons-material/Download";

const DownloadTemplate = forwardRef(
  (
    {
      title,
      description,
      graphics = [],
      handleDownload,
      edit = false,
      handleEdit,
      handleChange,
    },
    ref
  ) => {
    const classes = useStyles();

    return (
      <>
        <DialogActions>
          <Fab
            color={"primary"}
            size="medium"
            disabled={edit}
            onClick={handleDownload}
          >
            <DownloadIcon />
          </Fab>
          <Fab
            color={!edit ? "secondary" : "primary"}
            size="medium"
            onClick={handleEdit}
          >
            {!edit ? <EditOutlined /> : <DoneIcon />}
          </Fab>
        </DialogActions>
        <Box
          id="download"
          ref={ref}
          sx={{
            bgcolor: "background.paper",
            padding: "36px",
            display: "flex",
            flexDirection: "column",
            borderRadius: "12px",
          }}
        >
          {!edit ? (
            <>
              <Typography variant="h2" color="secondary" gutterBottom>
                {title}
              </Typography>
              {description && (
                <Typography
                  variant="h3"
                  gutterBottom
                  classes={{ root: classes.rootTypography }}
                >
                  {description}
                </Typography>
              )}
              <Divider
                  flexItem
                  sx={{marginTop: "16px!important"}}
                  classes={{
                    root: classes.root,
                  }}
                />
            </>
          ) : (
            <>
              {" "}
              <FormControl fullWidth margin="dense">
                <TextField
                  label="Titulo"
                  value={title}
                  onChange={(event) => handleChange("name", event.target.value)}
                />
              </FormControl>
              <FormControl fullWidth margin="dense">
                <TextField
                  label="Descripción"
                  placeholder="Agregar una descripción"
                  value={description}
                  onChange={(event) =>
                    handleChange("description", event.target.value)
                  }
                />
              </FormControl>
            </>
          )}
          {Array.isArray(graphics) ? (
            graphics.map((graphic, index) => (
              <Box
                sx={{
                  padding: "8px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h3" gutterBottom classes={{
                    root: classes.graphicTypography,
                  }}>
                  {graphic.name}
                </Typography>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img src={graphic.src} alt={graphic.name} style={{ maxWidth: "100%", maxHeight: "700px" }} />
                </div>
                {index !== graphics.length - 1 && ( 
                  <Divider
                    flexItem
                    classes={{
                      root: classes.root,
                    }}
                  />
                )}
              </Box>
            ))
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src={graphics} alt={title} style={{ maxWidth: "100%", maxHeight: "600px" }} />
            </div>
          )}
        </Box>
      </>
    );
  }
);

export default DownloadTemplate;
