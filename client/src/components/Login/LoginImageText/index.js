import React from "react";
import { Typography} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const LoginImageText = () => {
  const theme = useTheme();
  return (
    <div className="login-image-text-wrapper">
        <Typography variant="h3">Visualiza tus datos en PIBAS</Typography>
        <Typography variant="body1" 
        sx={{
          padding: '0.75rem',
          [theme.breakpoints.up('sm')]: {
            padding: '1rem 9rem',
          },
        }}>
          La información que se necesita para tomar decisiones seguras con mayor rapidez y obtener mejores resultados basados en los datos.
          </Typography>
    </div>
  );
};

export default LoginImageText;
