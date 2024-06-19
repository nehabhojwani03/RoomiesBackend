const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/aysnc');
const Request = require('../models/Request');

// @desc    Send Request
// @route   POST /api/v1/sendRequest
// @access  Private
exports.sendRequest = asyncHandler(async (req, res, next) => {
  req.body.requester = req.user.id;

  const request = await Request.create(req.body);
  res.status(201).json({
    success: true,
    data: request,
  });
});

// @desc    Accept or Decline Request
// @route   PUT /api/v1/request/:id
// @access  Private
exports.requestStatus = asyncHandler(async (req, res, next) => {
  let request = await Request.findById(req.params.id);
  let message = '';
  if (!request) {
    return next(
      new ErrorResponse(`Request Not Found with id of ${req.params.id}`, 404)
    );
  }

  request = await Request.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (req.body.status === 2) {
    message = 'Request Accepted';
  } else if (req.body.status === 3) {
    message = 'Request Rejected';
  } else {
    message = 'Request';
  }

  res.status(200).json({
    success: true,
    message: message,
  });
});

// @desc    Get Recipient Request List
// @route   GET /api/v1/recipientRequests
// @access  Private

exports.getRecipientRequestes = asyncHandler(async (req, res, next) => {
  var ObjectId = require('mongoose').Types.ObjectId;

  const requestes = await Request.find({
    recipient: new ObjectId(req.params.id),
  });
  res.status(200).json({
    success: true,
    message: requestes,
  });
});

// @desc    Get Requester Request List
// @route   GET /api/v1/requesterRequests
// @access  Private

exports.getRequesterRequestes = asyncHandler(async (req, res, next) => {
  var ObjectId = new require('mongoose').Types.ObjectId;

  const requestes = await Request.find({
    requester: new ObjectId(req.params.id),
  });

  res.status(200).json({
    success: true,
    message: requestes,
  });
});
