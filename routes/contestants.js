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
// const transactionRouter = require('./transactions');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers
// router.use('/:coinId/transactions', transactionRouter);

router
  .route('/')
  .get(advancedResults(Contestant), getContestants)
  .post(createContestant);

router
  .route('/:id')
  .get(getContestant)
  .put(protect, authorize('admin'), updateContestant)
  .delete(protect, authorize('admin'), deleteContestant);

module.exports = router;
