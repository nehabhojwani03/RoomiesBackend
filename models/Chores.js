const mongoose = require('mongoose');

const ChoresSchema = new mongoose.Schema({
  assignTo: {
    type: String,
  },
  deadline: {
    type: String,
  },
  taskDetails: {
    type: String,
  },
  priority: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Chores', ChoresSchema);
