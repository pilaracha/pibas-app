import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { Alert, Snackbar } from "@mui/material";
import AlertDialog from "components/Alert";

const DefaultTemplate = ({
  loading = false,
  snackbar,
  closeSnack,
  alert,
  children,
}) => {
  return (
    <>
      {loading ? (
        <Box
          sx={{ display: "flex" }}
          justifyContent="center"
          alignItems="center"
          minHeight="100px"
        >
          <CircularProgress />
        </Box>
      ) : (
        children
      )}
      {snackbar?.open && (
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={closeSnack}
        >
          <Alert
            onClose={closeSnack}
            severity="success"
            color="secondary"
            variant="filled"
            elevation={6}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      )}
      {alert?.open && <AlertDialog {...alert} />}
    </>
  );
};

export default DefaultTemplate;
