const express = require('express');
const router = express.Router();

const {
  createNotification,
  getNotificationsByUser,
  markAsRead,
  deleteNotification,
} = require('../controllers/notificationController');
router.post('/', createNotification);
router.get('/user/:userId', getNotificationsByUser);
router.patch('/:id/read', markAsRead);
router.delete('/:id', deleteNotification);

module.exports = router;
