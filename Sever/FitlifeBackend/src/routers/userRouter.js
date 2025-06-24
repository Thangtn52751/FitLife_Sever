const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middlewares/authMiddleware');
const UserController = require('../controllers/userController');

router.post(
  '/create-employee',
  AuthMiddleware.verifyToken,
  AuthMiddleware.isAdmin,
  UserController.createEmployee,
);
router.put(
  '/profile',
  AuthMiddleware.verifyToken,
  UserController.updateProfile,
);
router.put(
  '/change-password',
  AuthMiddleware.verifyToken,
  UserController.changePassword,
);
router.get('/profile', AuthMiddleware.verifyToken, UserController.getProfile);
router.get(
  '/',
  AuthMiddleware.verifyToken,
  AuthMiddleware.isEmployeeOrAdmin,
  UserController.getUsers,
);

router.get(
  '/:id',
  AuthMiddleware.verifyToken,
  AuthMiddleware.isEmployeeOrAdmin,
  UserController.getUserById,
);

module.exports = router;
