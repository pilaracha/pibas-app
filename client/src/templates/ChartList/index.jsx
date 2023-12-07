import { Masonry } from "@mui/lab";
import ChartCard from "components/ChartCard";
import { useStyles } from "./styles";

const ChartListTemplate = ({
  charts,
  handleDefault,
  handleAction,
  buttonActions,
}) => {
  const classes = useStyles();

  return (
    <Masonry column={2}>
      {handleDefault && (
        <div className={classes.element}>
          <ChartCard handleDefault={handleDefault} />
        </div>
      )}
      {charts.map((chart, index) => (
        <div className={classes.element} key={index}>
          <ChartCard
            content={chart}
            buttonActions={buttonActions}
            handleAction={handleAction}
          />
        </div>
      ))}
    </Masonry>
  );
};

export default ChartListTemplate;
