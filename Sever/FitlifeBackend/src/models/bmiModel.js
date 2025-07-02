const mongoose = require('mongoose');

const bmiSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recordDate: {
    type: Date,
    default: Date.now
  },
  height: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  bmiValue: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('BMIRecord', bmiSchema);
