const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
  menu_id: {
    type: Schema.Types.ObjectId,
    ref: 'menu'
  },
  sets: {
    type: Array,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Record = mongoose.model('record', RecordSchema);
