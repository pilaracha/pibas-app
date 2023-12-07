import { faker } from "@faker-js/faker";
import { STR, DATE, INT } from "common/helpers/types";

export const tasksExamples = [
  {
    id: 2,
    name: "Fecha de atención",
    assignment: "",
    type: DATE,
    responses: [
      {
        value: "20",
        length: faker.datatype.number({ min: 0, max: 50 }),
      },
      {
        value: "25",
        length: faker.datatype.number({ min: 0, max: 50 }),
      },
      {
        value: "30",
        length: faker.datatype.number({ min: 0, max: 50 }),
      },
      {
        value: "31",
        length: faker.datatype.number({ min: 0, max: 50 }),
      },
    ],
  },
  {
    id: 3,
    name: "Edad",
    assignment: "",
    type: INT,
    responses: [
      {
        value: "20",
        length: faker.datatype.number({ min: 18, max: 40 }),
      },
      {
        value: "25",
        length: faker.datatype.number({ min: 18, max: 40 }),
      },
      {
        value: "30",
        length: faker.datatype.number({ min: 18, max: 40 }),
      },
      {
        value: "31",
        length: faker.datatype.number({ min: 18, max: 40 }),
      },
    ],
  },
  {
    id: 4,
    name: "Forma de contacto",
    assignment: "",
    type: STR,
    responses: [
      {
        value: "Derivación institucional",
        length: faker.datatype.number({ min: 0, max: 50 }),
      },
      {
        value: "Encuentro presencial",
        length: faker.datatype.number({ min: 0, max: 50 }),
      },
      {
        value: "Mail",
        length: faker.datatype.number({ min: 0, max: 50 }),
      },
      {
        value: "Teléfono",
        length: faker.datatype.number({ min: 0, max: 50 }),
      },
    ],
  },
];
