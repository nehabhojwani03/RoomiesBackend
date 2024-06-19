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

router.route('/:id').put(requestStatus);

router.route('/recipientRequests/:id').get(getRecipientRequestes);

router.route('/requesterRequests/:id').get(getRequesterRequestes);

module.exports = router;
