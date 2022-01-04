const express = require('express');
const {
  getVotes,
  getVote,
  createVote,
  updateVote,
  deleteVote
} = require('../controllers/votes');

// Bring in model
const Vote = require('../models/Vote');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(
    advancedResults(Vote, {
      path: 'contestant',
      select: 'username contestantNo email'
    }),
    getVotes
  )
  .post(createVote);
router
  .route('/:id')
  .get(advancedResults(Vote, 'contestant'), getVote)
  .put(updateVote)
  .delete(protect, authorize('admin'), deleteVote);

module.exports = router;
