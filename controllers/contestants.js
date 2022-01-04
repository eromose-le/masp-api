const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Contestant = require('../models/Contestant');

// @desc    Get all contestants
// @route   GET /api/v1/contestants
// @access  Private
exports.getContestants = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single contestant
// @route   GET /api/v1/contestants/:id
// @access  Private
exports.getContestant = asyncHandler(async (req, res, next) => {
  const contestant = await Contestant.findById(req.params.id);

  if (!contestant) {
    return next(
      new ErrorResponse(`Contestant not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: contestant
  });
});

// @desc    Create new contestant
// @route   POST /api/v1/contestants
// @access  Private
exports.createContestant = asyncHandler(async (req, res, next) => {
  const contestant = await Contestant.create(req.body);

  res.status(201).json({
    success: true,
    msg: 'Created new contestant',
    data: contestant
  });
});

// @desc    Update contestant
// @route   PUT /api/v1/contestants/:id
// @access  Private
exports.updateContestant = asyncHandler(async (req, res, next) => {
  // req.body.user = req.user.id;
  let contestant = await Contestant.findById(req.params.id);

  if (!contestant) {
    return next(
      new ErrorResponse(`Contestant not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is contestant owner
  // if (req.user.role !== 'admin') {
  //   return next(
  //     new ErrorResponse(
  //       `User ${req.params.id} is not authorized to update this contestant`,
  //       401
  //     )
  //   );
  // }

  contestant = await Contestant.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    msg: `Updated contestant ${req.params.id}`,
    data: contestant
  });
});

// @desc    Delete contestant
// @route   DELETE /api/v1/contestants/:id
// @access  Private
exports.deleteContestant = asyncHandler(async (req, res, next) => {
  const contestant = await Contestant.findById(req.params.id);
  req.body.user = req.user.id;

  if (!contestant) {
    return next(
      new ErrorResponse(`Contestant not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is contestant owner
  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this contestant`,
        401
      )
    );
  }

  contestant.remove();

  res.status(200).json({
    success: true,
    msg: `Deleted contestant ${req.params.id}`,
    data: {}
  });
});
