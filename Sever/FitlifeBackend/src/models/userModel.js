const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, default: '' },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, default: '' },
    birthday: Date,
    gender: { type: String, enum: ['male', 'female'] },
    role: {
      type: String,
      enum: ['user', 'admin', 'employee'],
      default: 'user',
    },
    image: String,
  },
  { timestamps: true },
);

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
