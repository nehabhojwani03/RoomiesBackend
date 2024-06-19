const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please enter username'],
    unique: true,
  },

  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },

  email: {
    type: String,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please use a valid URL with HTTP or HTTPS',
    ],
    required: [true, 'Please enter your email address'],
    unique: true,
  },

  phoneno: {
    type: Number,
    required: [true, 'Please enter your phone number'],
    maxlength: [10, 'Enter 10 numbers only'],
    unique: true,
  },

  photos: {
    type: String,
    default: 'no-photo.png',
  },

  bio: {
    type: String,
  },

  gender: {
    type: String,
  },
  interest: {
    type: String,
    required: [true, 'Please enter your interest'],
  },

  personalityTraits: {
    type: String,
    required: [true, 'Please enter your personality traits'],
  },

  lifestyleHabits: {
    type: String,
    required: [true, 'Please enter your lifestyle habits'],
  },

  password: {
    type: String,
    required: [true, 'Please enter password'],
    minlength: 8,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt Password using bcrypt
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Set Profile Picture from multiavatar
UserSchema.pre('save', async function (next) {
  this.photos = `https://api.multiavatar.com/${this.username}.png?apiKey=RthEgS8ePU43Dy`;
  next();
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match User entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.getResetPasswordToken = function () {
  // Generate Token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash Token and set to resetPasswordToken Field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model('User', UserSchema);
