const router = require('express').Router();

const controller =
  require('../controllers/dashboard.controller');

// SUMMARY
router.get(
  '/summary',
  controller.getSummary
);

module.exports = router;