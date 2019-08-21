const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  records: [
    {
      sets: [
        {
          rep: {
            type: String
          }
        }
      ],
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Menu = mongoose.model('menu', MenuSchema);
