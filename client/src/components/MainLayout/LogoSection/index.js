// import { Link } from "react-router-dom";

// material-ui
import { ButtonBase } from "@mui/material";

// project imports
import config from "../../../config";
import Logo from "../Logo";
// import Logo from "ui-component/Logo";
// import BrightnessMediumIcon from "@mui/icons-material/BrightnessMedium";

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
  <ButtonBase
    disableRipple
    // component={Link}
    to={config.defaultPath}
  >
    <Logo />
  </ButtonBase>
);

export default LogoSection;
