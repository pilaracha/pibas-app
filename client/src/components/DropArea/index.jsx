// import React from "react";
// import { useDrop } from "react-dnd";
// import { Box } from "@mui/material";
// import { useStyles } from "./styles";

// const DropArea = ({ children, handleDrop }) => {
//   const classes = useStyles();

//   const [, dropRef] = useDrop(() => ({
//     accept: "image",
//     drop: (item) => {
//       handleDrop(item);
//     },
//   }));

//   // const moveImage = (fromIndex, toIndex) => {
//   //   setDroppedImages((prevImages) => {
//   //     const newImages = [...prevImages];
//   //     const movedImage = newImages.splice(fromIndex, 1)[0];
//   //     newImages.splice(toIndex, 0, movedImage);
//   //     return newImages;
//   //   });
//   // };

//   // const findImage = (imageId) => {
//   //   const imageIndex = droppedImages.findIndex((id) => id === imageId);
//   //   return {
//   //     index: imageIndex,
//   //     image: images.find((img) => img.id === droppedImages[imageIndex]),
//   //   };
//   // };

//   return (
//     <Box ref={dropRef} className={classes.dropAreaWrapper}>
//       {children}
//     </Box>
//   );
// };

// export default DropArea;
