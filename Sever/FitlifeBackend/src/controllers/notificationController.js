const asyncHandler = require('express-async-handler');
const Notification = require('../models/notificationModel');


const createNotification = asyncHandler(async (req, res) => {
  const { userId, category, title, body } = req.body;

  if (!userId || !title || !body) {
    res.status(400);
    throw new Error('Missing required fields');
  }

  const notification = await Notification.create({
    userId,
    category,
    title,
    body,
  });

  res.status(201).json(notification);
});

const getNotificationsByUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const notifications = await Notification.find({ userId }).sort({ sentAt: -1 });
  res.json(notifications);
});
const markAsRead = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const notification = await Notification.findByIdAndUpdate(
    id,
    { read: true },
    { new: true }
  );

  if (!notification) {
    res.status(404);
    throw new Error('Notification not found');
  }

  res.json(notification);
});

const deleteNotification = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const notification = await Notification.findByIdAndDelete(id);

  if (!notification) {
    res.status(404);
    throw new Error('Notification not found');
  }

  res.json({ message: 'Notification deleted' });
});

module.exports = {
  createNotification,
  getNotificationsByUser,
  markAsRead,
  deleteNotification,
};
