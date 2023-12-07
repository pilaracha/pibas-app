import { toSrc } from "common/helpers/functions";

const _ = require("lodash");

/* eslint-disable camelcase */
class Graphic {
  id = null;
  name = null;
  activity = null;
  type = null;
  indicatorX = null;
  indicatorY = null;
  indicatorZ = null;
  src = null;
  isFavorite = false;
  user = null;
  creationDate = null;

  constructor(obj) {
    // IF AN OBJECT WAS PASSED THEN INITIALISE PROPERTIES FROM THAT OBJECT
    for (const prop in obj) {
      if (obj[prop]) {
        if (prop === "image") {
          this["src"] = obj.image.data ? toSrc(obj.image.data) : null;
        } else if (_.camelCase(prop) === "creationDate") {
          this[_.camelCase(prop)] = new Date(obj[prop]);
        } else {
          this[_.camelCase(prop)] = obj[prop];
        }
      }
    }
  }
}

export default Graphic;
