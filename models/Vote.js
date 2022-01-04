const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  voteCount: {
    type: String,
    required: [true, 'Input Number of Vote']
  },
  voterEmail: {
    type: String,
    required: [true, 'Please add an email address']
  },
  amount: {
    type: String,
    required: [true, 'Invalid anmount']
  },
  contestantId: {
    type: String
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
    // required: true
  },
  contestant: {
    type: mongoose.Schema.ObjectId,
    ref: 'Contestant',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Vote', VoteSchema);
