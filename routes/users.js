const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');

const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

router.route('/').get(protect, getUsers).post(protect, createUser);
router
  .route('/:id')
  .get(getUser)
  .put(protect, updateUser)
  .delete(protect, deleteUser);

module.exports = router;
