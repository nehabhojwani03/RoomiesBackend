const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/aysnc');
const Chores = require('../models/Chores');

//@desc     Add Chores
//@routes   POST/api/v1/chores/addchores
//@access   private
exports.addChores = asyncHandler(async (req, res, next) => {
  const { assignTo, assignedBy, deadline, taskDetails, priority } = req.body;

  const chores = await Chores.create({
    assignTo,
    assignedBy,
    deadline,
    taskDetails,
    priority,
  });

  res.status(200).json({
    success: true,
    data: chores,
  });
});

//@desc     update chores
//@routes   POST/api/v1/chores/updatechores/:id
//@access   private
exports.updateChores = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    choresName: req.body.choresName,
    priority: req.body.priority,
    assignedTo: req.body.assignedTo,
    completedBy: req.body.completedBy,
    completedAt: req.body.completedAt,
  };

  const chores = await Chores.findByIdAndUpdate(req.params.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: chores,
  });
});

//@desc     Delete chores
//@routes   DELETE /api/v1/chores/deletechores/:id
//@access   private
exports.deleteChores = asyncHandler(async (req, res, next) => {
  const chores = await Chores.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});

//@desc     Get All chores
//@routes   GET /api/v1/chores/getchores
//@access   private
exports.getChoresByName = asyncHandler(async (req, res, next) => {
  const chores = await Chores.find({ assignTo: req.params.name });

  res.status(200).json({
    success: true,
    count: chores.length,
    data: chores,
  });
});

//@desc     Get All chores
//@routes   GET /api/v1/chores/getchoresAssignedBy
//@access   private
exports.getChoresAssignedBy = asyncHandler(async (req, res, next) => {
  const chores = await Chores.find({ assignedBy: req.params.name });

  res.status(200).json({
    success: true,
    count: chores.length,
    data: chores,
  });
});
