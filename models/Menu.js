const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  records: []
});

module.exports = Menu = mongoose.model('menu', MenuSchema);
