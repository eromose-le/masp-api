const express = require('express');
const {
  getContestants,
  getContestant,
  createContestant,
  updateContestant,
  deleteContestant
} = require('../controllers/contestants');

const Contestant = require('../models/Contestant');
const advancedResults = require('../middleware/advancedResults');

// Include other resource routers
const voteRouter = require('./votes');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:contestantId/votes', voteRouter);

router
  .route('/')
  .get(advancedResults(Contestant), getContestants)
  .post(createContestant);

router
  .route('/:id')
  .get(advancedResults(Contestant), getContestant)
  .put(updateContestant)
  .delete(protect, authorize('admin'), deleteContestant);

module.exports = router;
