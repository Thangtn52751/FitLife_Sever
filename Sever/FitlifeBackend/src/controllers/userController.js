const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');

const createEmployee = asyncHandler(async (req, res) => {
  const { fullName, email, password, phoneNumber, birthday, gender, image } = req.body;
  const existing = await UserModel.findOne({ email });
  if (existing) {
    res.status(400);
    throw new Error('Email already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newEmployee = await UserModel.create({
    fullName,
    email,
    password: hashedPassword,
    phoneNumber,
    birthday,
    gender,
    image,
    role: 'employee',
  });
  res.status(201).json({
    success: true,
    message: 'Employee created successfully',
    data: {
      id: newEmployee._id,
      email: newEmployee.email,
      fullName: newEmployee.fullName,
      role: newEmployee.role,
    },
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  const { fullName, phoneNumber, birthday, gender, image, isBlocked, isLoyalCustomer } = req.body;
  const user = await UserModel.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  user.fullName = fullName ?? user.fullName;
  user.phoneNumber = phoneNumber ?? user.phoneNumber;
  user.birthday = birthday ?? user.birthday;
  user.gender = gender ?? user.gender;
  user.image = image ?? user.image;
  if (req.user.role === 'admin') {
    user.isBlocked = typeof isBlocked === 'boolean' ? isBlocked : user.isBlocked;
    user.isLoyalCustomer = typeof isLoyalCustomer === 'boolean' ? isLoyalCustomer : user.isLoyalCustomer;
  }
  const updatedUser = await user.save();
  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      birthday: updatedUser.birthday,
      gender: updatedUser.gender,
      image: updatedUser.image,
      isBlocked: updatedUser.isBlocked,
      isLoyalCustomer: updatedUser.isLoyalCustomer,
    },
  });
});

const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await UserModel.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    res.status(400);
    throw new Error('Current password is incorrect');
  }
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  res.status(200).json({
    success: true,
    message: 'Password changed successfully',
  });
});

const getProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id).select('-password');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.status(200).json({
    success: true,
    message: 'Get user profile successfully',
    data: user,
  });
});

const getUsers = asyncHandler(async (req, res) => {
  const { role, isBlocked, isLoyalCustomer, search } = req.query;
  const filter = {};
  if (role) filter.role = role;
  if (isBlocked !== undefined) filter.isBlocked = isBlocked === 'true';
  if (isLoyalCustomer !== undefined) filter.isLoyalCustomer = isLoyalCustomer === 'true';
  if (search) {
    filter.$or = [
      { fullName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { phoneNumber: { $regex: search, $options: 'i' } },
    ];
  }
  const users = await UserModel.find(filter).select('-password').sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    message: 'Fetched users successfully',
    data: users,
  });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await UserModel.find().select('-password').sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    message: 'Fetched all users successfully',
    data: users,
  });
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.params.id).select('-password');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.status(200).json({
    success: true,
    message: 'Fetched user successfully',
    data: user,
  });
});

module.exports = {
  createEmployee,
  updateProfile,
  changePassword,
  getProfile,
  getUsers,
  getAllUsers,
  getUserById,
};
