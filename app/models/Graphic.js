const mongoose = require("mongoose");
const { Schema } = mongoose;

const indicatorSchema = new Schema({
  code: String,
  type: {
    type: String,
    default: "-1",
  },
});

const graphicSchema = new Schema({
  name: String,
  activity: Number,
  type: String,
  indicator_x: indicatorSchema,
  indicator_y: indicatorSchema,
  indicator_z: String, 
  image: {
    data: Buffer,
    contentType: String,
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  is_favorite: {
    type: Boolean,
    default: false,
  },
});

mongoose.model("graphics", graphicSchema);
