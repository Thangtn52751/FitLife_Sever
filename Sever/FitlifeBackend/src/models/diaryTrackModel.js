const mongoose = require('mongoose');

const DiaryTrackSchema = new mongoose.Schema(
  {
    diaryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Diary', required: true },
    trackDate: { type: Date, default: Date.now },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const DiaryTrackModel = mongoose.model('DiaryTrack', DiaryTrackSchema);
module.exports = DiaryTrackModel;
