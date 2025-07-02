const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middlewares/authMiddleware');
const DiaryController = require('../controllers/diaryController');

// nhật ký
router.post('/', AuthMiddleware.verifyToken, DiaryController.createDiary);
router.get('/', AuthMiddleware.verifyToken, DiaryController.getDiaries);
router.get('/:id', AuthMiddleware.verifyToken, DiaryController.getDiaryById);
router.put('/:id', AuthMiddleware.verifyToken, DiaryController.updateDiary);
router.delete('/:id', AuthMiddleware.verifyToken, DiaryController.deleteDiary);

// track
router.post('/:id/tracks', AuthMiddleware.verifyToken, DiaryController.createDiaryTrack);
router.get('/:id/tracks', AuthMiddleware.verifyToken, DiaryController.getDiaryTracks);

module.exports = router;
