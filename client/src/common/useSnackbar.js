import React from "react";

export const useSnackbar = (message = null) => {
  const [snackbar, setSnackbar] = React.useState({
    open: Boolean(message),
    message: message,
  });

  function open(message) {
    setSnackbar({
      open: true,
      message: message,
    });
  }

  function close() {
    setSnackbar({
      open: false,
      message: "",
    });
  }

  return {
    open,
    close,
    snackbar,
  };
};

export default useSnackbar;
