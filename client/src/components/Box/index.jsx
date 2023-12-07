import { Card } from "@mui/material";
import React from "react";
import { useDrag } from "react-dnd";

// Componente de prueba para drag

const Box = ({ id, name }) => {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "BOX",
    item: { id, name },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));

  return (
    <React.Fragment>
      {/* <div ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1 }}> */}
      {/* The drag ref marks this node as being the "pick-up" node */}
      {/* <div role="Handle" ref={drag}> */}
      {/* <Card ref={drag}>"to drag"</Card> */}
      <Card ref={drag}>
        {name}
        {isDragging && "😱"}
      </Card>
      {/* </div> */}
    </React.Fragment>
  );
};

export default Box;
