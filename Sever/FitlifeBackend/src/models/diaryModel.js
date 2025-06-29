const mongoose = require('mongoose');

const DiarySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    frequency: { type: String, enum: ['daily', 'weekly', 'monthly'], default: 'daily' },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
  },
  { timestamps: true }
);

const DiaryModel = mongoose.model('Diary', DiarySchema);
module.exports = DiaryModel;
