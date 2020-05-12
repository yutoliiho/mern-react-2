const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema:
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Items = mongoose.model('Items', ItemSchema);
module.exports = Items;
