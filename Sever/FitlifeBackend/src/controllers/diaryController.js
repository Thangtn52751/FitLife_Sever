const asyncHandler = require('express-async-handler');
const DiaryModel = require('../models/diaryModel');
const DiaryTrackModel = require('../models/diaryTrackModel');

// Tạo nhật ký
exports.createDiary = asyncHandler(async (req, res) => {
  const { title, description, frequency, startDate, endDate } = req.body;
  const diary = await DiaryModel.create({
    userId: req.user._id,
    title,
    description,
    frequency,
    startDate,
    endDate,
  });
  res.status(201).json({ success: true, data: diary });
});

// Lấy danh sách nhật ký
exports.getDiaries = asyncHandler(async (req, res) => {
  const diaries = await DiaryModel.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, data: diaries });
});

// Lấy chi tiết 1 nhật ký
exports.getDiaryById = asyncHandler(async (req, res) => {
  const diary = await DiaryModel.findById(req.params.id);
  if (!diary) {
    res.status(404);
    throw new Error('Diary not found');
  }
  res.json({ success: true, data: diary });
});

// Cập nhật nhật ký
exports.updateDiary = asyncHandler(async (req, res) => {
  const diary = await DiaryModel.findById(req.params.id);
  if (!diary) {
    res.status(404);
    throw new Error('Diary not found');
  }
  if (diary.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('You do not own this diary');
  }
  const { title, description, frequency, startDate, endDate } = req.body;
  diary.title = title ?? diary.title;
  diary.description = description ?? diary.description;
  diary.frequency = frequency ?? diary.frequency;
  diary.startDate = startDate ?? diary.startDate;
  diary.endDate = endDate ?? diary.endDate;

  const updated = await diary.save();
  res.json({ success: true, data: updated });
});

// Xóa nhật ký
exports.deleteDiary = asyncHandler(async (req, res) => {
  const diary = await DiaryModel.findById(req.params.id);
  if (!diary) {
    res.status(404);
    throw new Error('Diary not found');
  }
  if (diary.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('You do not own this diary');
  }
  await diary.deleteOne();
  res.json({ success: true, message: 'Diary deleted' });
});

// Ghi nhật ký track
exports.createDiaryTrack = asyncHandler(async (req, res) => {
  const { completed } = req.body;
  const diaryId = req.params.id;
  const diary = await DiaryModel.findById(diaryId);
  if (!diary) {
    res.status(404);
    throw new Error('Diary not found');
  }
  const track = await DiaryTrackModel.create({
    diaryId,
    completed: completed ?? false,
  });
  res.status(201).json({ success: true, data: track });
});

// Lấy lịch sử track
exports.getDiaryTracks = asyncHandler(async (req, res) => {
  const diaryId = req.params.id;
  const tracks = await DiaryTrackModel.find({ diaryId }).sort({ createdAt: -1 });
  res.json({ success: true, data: tracks });
});
