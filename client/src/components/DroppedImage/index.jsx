import { useDrop, useDrag } from "react-dnd";
import { Card, CardMedia, Grid } from "@mui/material";

const DroppedImage = ({ image, findImage, moveImage }) => {
  const [, dragRef /* dragPreview */] = useDrag(() => ({
    type: "droppedImage",
    item: { id: image.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, dropRef] = useDrop(() => ({
    accept: "droppedImage",
    hover: (item) => {
      const { index: draggedIndex } = findImage(item.id);
      const { index: hoverIndex } = findImage(image.id);

      if (draggedIndex === hoverIndex) return;
      moveImage(draggedIndex, hoverIndex);
      item.index = hoverIndex;
    },
  }));

  return (
    <Grid item xs={6}>
      <Card
        ref={(node) => {
          dragRef(node);
          dropRef(node);
        }}
        sx={{ width: "100%", borderRadius: "12px", marginBottom: "16px" }}
      >
        <CardMedia component="img" image={image.src} alt="Imagen soltada" />
      </Card>
    </Grid>
  );
};

export default DroppedImage;
