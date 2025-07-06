require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');
const UserModel = require('../models/userModel');


const verificationCodes  = new Map();
const verificationLimits = new Map();


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});


const generateToken = user =>
  jwt.sign(
    { _id: user._id, email: user.email, role: user.role },
    process.env.SECRET_KEY,
    { expiresIn: '1d' }
  );


exports.register = asyncHandler(async (req, res) => {
  const { email, password, fullName, image } = req.body;
  const exist = await UserModel.findOne({ email: email.trim() });
  if (exist) {
    res.status(409);
    throw new Error('Email already registered');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.create({
    email: email.trim(),
    password: hashedPassword,
    fullName,
    image,
    role: 'user',
  });
  res.status(201).json({
    success: true,
    data: {
      token: generateToken(user),
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        image: user.image,
        role: user.role,
      },
    },
  });
});


exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  if (user.isBlocked) {
    res.status(403);
    throw new Error('Your account is blocked');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401);
    throw new Error('Invalid email or password');
  }
  res.status(200).json({
    success: true,
    data: {
      token: generateToken(user),
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        image: user.image,
        role: user.role,
      },
    },
  });
});


exports.sendVerificationCode = asyncHandler(async (req, res) => {
  const { email, type } = req.body;
  if (!email || !type) {
    res.status(400);
    throw new Error('Email and type are required');
  }
  const count = verificationLimits.get(email) || 0;
  if (count >= 5) {
    res.status(429);
    throw new Error('Too many requests, try again later');
  }
  verificationLimits.set(email, count + 1);
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  verificationCodes.set(email, code);
  await transporter.sendMail({
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: 'Your Verification Code',
    text: `Your verification code is ${code}`,
  });
  res.json({ success: true, message: 'Verification code sent' });
});


exports.confirmVerificationCode = asyncHandler(async (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) {
    res.status(400);
    throw new Error('Email and code are required');
  }
  const stored = verificationCodes.get(email);
  if (stored !== code) {
    res.status(400);
    throw new Error('Invalid verification code');
  }

  res.json({ success: true, message: 'Verification code confirmed' });
});


exports.resetPassword = asyncHandler(async (req, res) => {
  const { email, code, newPassword } = req.body;
  if (!email || !code || !newPassword) {
    res.status(400);
    throw new Error('Email, code, and newPassword are required');
  }
  const stored = verificationCodes.get(email);
  if (stored !== code) {
    res.status(400);
    throw new Error('Invalid verification code');
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  verificationCodes.delete(email);
  verificationLimits.delete(email);
  res.json({ success: true, message: 'Password reset successful' });
});
