import { List, ListItem } from "@mui/material";
import Chip from "components/Chip";
import React, { useEffect } from "react";
import { useDrag } from "react-dnd";

export function DraggableChip(chip) {
  const [{ isDragging }, drag /*dragPreview*/] = useDrag(() => ({
    type: "BOX",
    item: chip,
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));

  return (
    <div ref={drag}>
      <Chip size="small" variant="outlined" color="secondary" {...chip} />{" "}
      {isDragging && "😱"}
    </div>
  );
}

const ChipList = ({ items }) => {
  return (
    <List
      dense
      sx={{
        flexGrow: 1,
        maxHeight: 100,
        overflow: "scroll",
        border: "2px solid #f7f7f7",
      }}
    >
      {items.map((item, index) => {
        return (
          <ListItem key={index}>
            <Chip {...item} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default ChipList;
