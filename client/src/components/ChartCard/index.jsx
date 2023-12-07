import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  Tooltip,
  Typography,
} from "@mui/material";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useStyles } from "./styles";
import clsx from "clsx";

const ChartCard = ({
  content,
  handleDefault,
  tablero = false,
  handleAction,
  buttonActions,
}) => {
  const classes = useStyles();

  const buttons = (isFavorite) => {
    return [
      {
        icon: <FileDownloadIcon color="primary" />,
        onClick: buttonActions.download,
      },
      {
        icon: isFavorite ? (
          <FavoriteIcon color="primary" />
        ) : (
          <FavoriteBorderOutlinedIcon color="primary" />
        ),
        onClick: buttonActions.favorite,
      },
    ];
  };

  const defaultCard = (
    <div className={classes.container}>
      <IconButton onClick={handleDefault} size="large">
        <AddSharpIcon fontSize="large" classes={{ root: classes.iconRoot }} />
      </IconButton>
      <div className={classes.element}>
        <Typography> Crear {tablero ? "Tablero" : "Gráficos"}</Typography>
      </div>
    </div>
  );

  return (
    <Card
      classes={{
        root: clsx(classes.cardRoot, {
          [classes.cardRootDefault]: !content,
        }),
      }}
      variant="outlined"
    >
      {!content ? (
        defaultCard
      ) : (
        <>
          {content.name && (
            <CardHeader
              disableTypography
              title={<Typography variant="h4">{content.name} </Typography>}
            />
          )}
          <Divider />
          <CardActionArea onClick={() => handleAction(content)}>
            {!tablero ? (
              <CardMedia component="img" src={content.src} alt={content.name} />
            ) : (
              <CardContent>
                <ImageList cols={2}>
                  {content.graphics.map((graphic, index) => (
                    <ImageListItem key={index}>
                      <img src={graphic.src} alt={graphic.name} />
                    </ImageListItem>
                  ))}
                </ImageList>
              </CardContent>
            )}
          </CardActionArea>
          <Divider />
          {buttonActions && (
            <CardActions classes={{ root: classes.actionsRoot }}>
              {buttons(content.isFavorite).map((button, index) => (
                <Tooltip key={index} title={button.tooltip}>
                  <IconButton
                    key={index}
                    onClick={() => button.onClick(content.id)}
                  >
                    {button.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </CardActions>
          )}
        </>
      )}
    </Card>
  );
};

export default ChartCard;
