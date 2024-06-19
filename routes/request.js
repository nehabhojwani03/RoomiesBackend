const express = require('express');
const {
  sendRequest,
  requestStatus,
  getRecipientRequestes,
  getRequesterRequestes,
} = require('../controllers/request');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

router.route('/sendrequest').post(sendRequest);

router.route('/:id').put(protect, requestStatus);

router.route('/recipientRequests/:id').get(protect, getRecipientRequestes);

router.route('/requesterRequests/:id').get(protect, getRequesterRequestes);

module.exports = router;
