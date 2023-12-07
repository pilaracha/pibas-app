import React from "react";
import { Grid } from "@mui/material";
import Logo from "components/MainLayout/Logo";
import ImageLogin from 'assets/images/login.png';
import LoginForm from "components/Login/LoginForm";
import LoginImageText from "components/Login/LoginImageText";

const Login = () => {
  return (
    <Grid container height='100vh'>
      <Grid item xs={12} md={6} p={2} pl={4}>
        <Grid container direction="column" minHeight="100%">
          <Grid item sm={12} md={6} >
            <Logo />
          </Grid>
          <Grid item sm={12} container direction="column" style={{ flexGrow: 1 }} alignItems="center" justifyContent="center" >
            <LoginForm />
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={12} md={6} style={{backgroundImage: `url(${ImageLogin})`, backgroundSize: 'cover'}}>
        <LoginImageText />
      </Grid>
    </Grid>
  );
};

export default Login;
