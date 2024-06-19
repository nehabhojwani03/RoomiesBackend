const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  recipient: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  userName: {
    type: String,
  },
  // Here 1 = Requested, 2 = Accepted, 3 = Rejected
  status: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Request', RequestSchema);
