import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useMemo } from "react";
import ImageCard from "./ImageCard";
import { Grid, Typography } from "@mui/material";
import { useStyles } from "./styles";

function ColumnContainer({ column, images }) {
  const classes = useStyles();

  const imagesIds = useMemo(() => {
    return images.map((image) => image.id);
  }, [images]);

  const { setNodeRef } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  return (
    <Grid
      item
      xs={column.size}
      ref={setNodeRef}
      className={classes.dropAreaWrapper}
    >
      <SortableContext items={imagesIds}>
        {images.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </SortableContext>
      {column.id === "dashboard" && !images.length && (
        <Typography variant="h5" className={classes.emptyMessage}>
          Administra tu tablero desplazando los gráficos de la derecha -&gt;
        </Typography>
      )}
    </Grid>
  );
}

export default ColumnContainer;
