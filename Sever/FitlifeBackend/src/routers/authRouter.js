const express = require('express');
const router = express.Router();
const {
  register,
  login,
  sendVerificationCode,
  confirmVerificationCode,
  resetPassword,
} = require('../controllers/authController');

router.post('/register',register);
router.post('/login', login);


router.post('/send-verification-code',sendVerificationCode);
router.post('/confirm-verification-code', confirmVerificationCode);
router.post('/reset-password',resetPassword);

module.exports = router;
