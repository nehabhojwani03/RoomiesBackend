const express = require('express');
const {
  register,
  login,
  getMe,
  getAllUsers,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
  userUploadPhoto,
} = require('../controllers/auth');

const router = express.Router();
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/allusers', getAllUsers);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.put('/uploadphoto', protect, userUploadPhoto);
module.exports = router;
