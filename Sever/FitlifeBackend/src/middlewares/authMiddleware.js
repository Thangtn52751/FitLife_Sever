const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const UserModel = require('../models/userModel');

const verifyToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401);
    throw new Error('Access token missing');
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await UserModel.findById(decoded._id);

    if (!user) {
      res.status(403);
      throw new Error('User not found');
    }

    if (user.isBlocked) {
      res.status(403);
      throw new Error('Your account is blocked');
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('JWT verification failed:', error.message);
    res.status(403);
    throw new Error('Invalid token');
  }
});

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Admin access only');
  }
  next();
};

const isEmployeeOrAdmin = (req, res, next) => {
  if (!['admin', 'employee'].includes(req.user.role)) {
    res.status(403);
    throw new Error('Employee or Admin access only');
  }
  next();
};

const isOwnerOrAdmin = (modelKey = 'userId') => {
  return (req, res, next) => {
    const resourceOwnerId =
      req.body[modelKey] || req.params[modelKey] || req.query[modelKey];

    if (
      req.user.role !== 'admin' &&
      req.user._id.toString() !== resourceOwnerId
    ) {
      res.status(403);
      throw new Error('You do not own this resource');
    }
    next();
  };
};

const AuthMiddleware = {
  verifyToken,
  isAdmin,
  isEmployeeOrAdmin,
  isOwnerOrAdmin,
};
module.exports = AuthMiddleware;
