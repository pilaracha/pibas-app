import Graphic from "./Graphic";

const _ = require("lodash");

/* eslint-disable camelcase */
class Dashboard {
  id = null;
  name = null;
  graphics = [];
  isFavorite = false;
  user = null;
  creationDate = null;

  constructor(obj) {
    // IF AN OBJECT WAS PASSED THEN INITIALISE PROPERTIES FROM THAT OBJECT
    for (const prop in obj) {
      if (obj[prop]) {
        prop === "graphics"
          ? (this["graphics"] = obj[prop].map((o) => new Graphic(o)))
          : (this[_.camelCase(prop)] = obj[prop]);
      }
    }
  }
}

export default Dashboard;
