const mongoose = require('mongoose');
const { Schema } = mongoose;

const dashboardSchema = new Schema({
  name: String,
  creation_date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  graphics: [{
    type: Schema.Types.ObjectId,
    ref: 'graphics'
  }],
  is_favorite: {
    type: Boolean,
    default: false
  }
});

mongoose.model('dashboards', dashboardSchema);