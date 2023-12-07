import { useState } from "react";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Grid } from "@mui/material";
import { arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import ImageCard from "./ImageCard";

const defaultCols = [
  {
    id: "dashboard",
    size: 9,
    imageSize: "6",
  },
  {
    id: "graphics",
    size: 3,
    imageSize: "12",
  },
];

function KanbanBoard({ images, setImages }) {
  const [columns, setColumns] = useState(defaultCols);

  // eslint-disable-next-line no-unused-vars
  const [activeColumn, setActiveColumn] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [activeImage, setActiveImage] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
    >
      <div className="m-auto flex gap-4">
        <Grid container spacing={2}>
          {columns.map((col) => (
            <ColumnContainer
              key={col.id}
              column={col}
              images={images.filter((image) => image.columnId === col.id)}
            />
          ))}
        </Grid>
      </div>

      {createPortal(
        <DragOverlay>
          {activeColumn && (
            <ColumnContainer
              column={activeColumn}
              images={images.filter(
                (image) => image.columnId === activeColumn.id
              )}
            />
          )}
          {activeImage && <ImageCard image={activeImage} />}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );

  function onDragStart(event) {
    if (event.active.data.current?.type === "Image") {
      setActiveImage(event.active.data.current.image);
      return;
    }
  }

  function onDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Image";
    const isOverATask = over.data.current?.type === "Image";

    if (!isActiveATask) return;

    // Im dropping a Image over another Image
    if (isActiveATask && isOverATask) {
      setImages((images) => {
        const activeIndex = images.findIndex((t) => t.id === activeId);
        const overIndex = images.findIndex((t) => t.id === overId);

        if (images[activeIndex].columnId !== images[overIndex].columnId) {
          images[activeIndex].columnId = images[overIndex].columnId;
          return arrayMove(images, activeIndex, overIndex - 1);
        }

        return arrayMove(images, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Image over a column
    if (isActiveATask && isOverAColumn) {
      setImages((images) => {
        const activeIndex = images.findIndex((t) => t.id === activeId);

        images[activeIndex].columnId = overId;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(images, activeIndex, activeIndex);
      });
    }
  }
}

export default KanbanBoard;
