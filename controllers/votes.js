const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Vote = require('../models/Vote');
const Contestant = require('../models/Contestant');

// @desc    Get all votes
// @route   GET /api/v1/votes
// @route   GET /api/v1/contestants/:contestantId/votes
// @access  Private
exports.getVotes = asyncHandler(async (req, res, next) => {
  if (req.params.contestantId) {
    // get single vote
    const votes = await Vote.find({
      contestant: req.params.contestantId
    }).populate({
      path: 'contestant',
      select: 'username contestantNo email'
    });

    // with pagination
    // return res.status(200).json(res.advancedResults);

    // without pagination
    return res.status(200).json({
      success: true,
      count: votes.length,
      data: votes
    });
  } else {
    // get all votes
    res.status(200).json(res.advancedResults);
  }
});

// @desc    Get single vote
// @route   GET /api/v1/votes/:id
// @access  Private
exports.getVote = asyncHandler(async (req, res, next) => {
  const vote = await Vote.findById(req.params.id).populate({
    path: 'contestant',
    select: 'username contestantNo email'
  });

  if (!vote) {
    return next(
      new ErrorResponse(`Vote not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: vote
  });
});

// @desc    Create new vote
// @route   POST /api/v1/votes
// @route   POST /api/v1/contestants/:contestantsId/votes
// @access  Private
exports.createVote = asyncHandler(async (req, res, next) => {
  req.body.contestant = req.body.contestant;

  const contestant = await Contestant.findById(req.body.contestant);

  if (!contestant) {
    return next(
      new ErrorResponse(
        `Contestant not found with id of ${req.body.contestant}`,
        404
      )
    );
  }

  const vote = await Vote.create(req.body);

  res.status(201).json({
    success: true,
    msg: 'Created new vote',
    data: vote
  });
});

// @desc    Update vote
// @route   PUT /api/v1/votes/:id
// @access  Private
exports.updateVote = asyncHandler(async (req, res, next) => {
  let vote = await Vote.findById(req.params.id);

  if (!vote) {
    return next(
      new ErrorResponse(`Vote not found with id of ${req.params.id}`, 404)
    );
  }

  vote = await Vote.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: vote
  });
});

// @desc    Delete vote
// @route   DELETE /api/v1/votes/:id
// @access  Private
exports.deleteVote = asyncHandler(async (req, res, next) => {
  const vote = await Vote.findById(req.params.id);
  req.body.user = req.user.id;

  if (!vote) {
    return next(
      new ErrorResponse(`Vote not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is contestant owner
  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this vote`,
        401
      )
    );
  }

  await vote.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
