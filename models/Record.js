const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
  menu: {
    type: Schema.Types.ObjectId,
    ref: 'menu'
  },
  title: {
    type: String,
    ref: 'menu'
  },
  record: [
    {
      set: {
        type: Number
      },
      weight: {
        type: Number
      },
      reps: {
        type: Number
      }
    }
  ],
  date: {
    type: String
  }
});

module.exports = Record = mongoose.model('record', RecordSchema);
