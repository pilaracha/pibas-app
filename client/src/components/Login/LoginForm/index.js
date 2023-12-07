import React, { useState } from "react";
import { Typography, Button, Link } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import { useLocation, useNavigate } from "react-router-dom";
import useLogin from "common/useLogin";
import { AuthService } from "services/AuthService";
import { useTheme } from "@mui/material/styles";

const LoginForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useLogin();
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    const googleUser = await signIn();
    googleUser &&
      AuthService.login(googleUser)
        .then((response) => {
          const origin = location.state?.from?.pathname || "/";
          navigate(origin);
          window.location.reload()
        })
        .catch((error) => {
          setError("Hubo un error al iniciar sesión, intente de nuevo.");
        });
  };

  return (
    <>
      <Typography variant="h2" mb={1} align="center" color={theme.palette.secondary["dark"]}>Te damos la bienvenida a PIBAS!</Typography>
      <Typography variant="subtitle1" align="center" color={theme.palette.grey[500]} mb={1}>Para acceder, inicia sesión</Typography>
      <Button variant="contained" color="primary" startIcon={<GoogleIcon />} sx={{ paddingLeft: '5rem', paddingRight: '5rem' }} onClick={() => { return handleLogin(); }}>Continuar con Google</Button>
      {error && <Typography variant="subtitle2" align="center" mt={1} fontWeight="600" color="error">{error}</Typography>}
      <Typography variant="subtitle1" align="center" color={theme.palette.grey[500]} mt={1} fontWeight="600">Todavía no tienes una cuenta? Visita&nbsp;
        <Link href="#" underline="hover" color={theme.palette.grey[500]}>
          DEHIA!
        </Link>
      </Typography>
    </>
  );
};

export default LoginForm;
