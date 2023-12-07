import React from "react";

export const useAlert = () => {
  const [alert, setAlert] = React.useState({
    open: false,
    title: "",
    handleAccept: null,
    handleCancel: null,
  });

  function open({ title, handleAccept, handleCancel }) {
    setAlert({
      open: true,
      title: title,
      handleCancel: handleCancel,
      handleAccept: () => {
        handleAccept && handleAccept();
        close();
      },
    });
  }

  function close() {
    setAlert({
      open: false,
      title: "",
      handleAccept: null,
    });
  }

  return {
    open,
    close,
    alert,
  };
};

export default useAlert;
