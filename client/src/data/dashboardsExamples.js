export const imagesExamples = [
  { id: 1, src: "https://i.ibb.co/rGQvy3V/1.png" },
  { id: 2, src: "https://i.ibb.co/WtZKMYT/2.png" },
  { id: 3, src: "https://i.ibb.co/59qY7dx/3.png" },
  { id: 4, src: "https://i.ibb.co/rGQvy3V/1.png" },
  { id: 5, src: "https://i.ibb.co/59qY7dx/3.png" },
];

export const dashboardsExamples = [
  {
    id: 1,
    title: "Tablero 1",
    content: [imagesExamples[0], imagesExamples[1]],
  },
  {
    id: 2,
    title: "Tablero 2",
    content: imagesExamples.map((c) => c),
  },
  {
    id: 3,
    title: "Tablero 3",
    content: imagesExamples.map((c) => c),
  },
];
