import React from "react";

import { RouterProvider } from "react-router-dom";
import routes from "./router/routes";
import { Context } from "./common/Context";

import { useSelector } from "react-redux";
import themes from "./themes";

import { ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material";
import { AuthService } from "services/AuthService";

const App = () => {
  const customization = useSelector((state) => state.customization);

  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = React.useState(null);
  // eslint-disable-next-line no-unused-vars
  const [load, setLoad] = React.useState(false);

  React.useEffect(() => {
    AuthService.loadUser()
      .then((user) => {
        setUser(user);
        setLoad(true);
      })
      .catch((_) => {
        setLoad(true);
      });

    const currentUserObserver = AuthService.currentUser.subscribe((user) => {
      setUser(user);
    });

    return () => {
      currentUserObserver.unsubscribe();
    };
  }, []);

  return (
    <Context>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
          {load ? <RouterProvider router={routes(user)} /> : <></>}
        </ThemeProvider>
      </StyledEngineProvider>
    </Context>
  );
};

export default App;
