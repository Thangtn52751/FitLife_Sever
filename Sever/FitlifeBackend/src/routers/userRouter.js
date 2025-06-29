const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUsers,
  getUserById,
  createEmployee,
  updateProfile,
  changePassword,
  getProfile,
} = require('../controllers/userController');

router.get('/', getAllUsers);
router.get('/filter', getUsers);
router.get('/:id', getUserById);
router.post('/employees', createEmployee);
router.put('/profile', updateProfile);
router.put('/change-password', changePassword);
router.get('/profile', getProfile);

module.exports = router;
