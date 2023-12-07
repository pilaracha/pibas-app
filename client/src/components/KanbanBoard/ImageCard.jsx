import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardMedia } from "@mui/material";

function ImageCard({ image }) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: image.id,
    data: {
      type: "Image",
      image,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return <div ref={setNodeRef} style={style} className="" />;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className=""
    >
      <Card sx={{ width: "100%", borderRadius: "12px", marginBottom: "16px" }}>
        <CardMedia component="img" image={image.src} alt="Imagen arrastrable" />
      </Card>
    </div>
  );
}

export default ImageCard;
