import { useNavigate } from "react-router-dom";
import ChartCard from "components/ChartCard";
import { Masonry } from "@mui/lab";
import { useStyles } from "./styles";

const DashboardsTemplate = ({
  tableros,
  handleDefault,
  buttonActions,
}) => {
  const classes = useStyles();

  const navigate = useNavigate();

  return (
    <Masonry column={2}>
      {handleDefault && (
        <div className={classes.element}>
          <ChartCard tablero handleDefault={handleDefault} />
        </div>
      )}
      {tableros.map((t, index) => (
        <div className={classes.element} key={index}>
          <ChartCard
            content={t}
            tablero
            handleAction={() => navigate(`/tableros/${t.id}`)}
            buttonActions={buttonActions}
          />
        </div>
      ))}
    </Masonry>
  );
};

export default DashboardsTemplate;
