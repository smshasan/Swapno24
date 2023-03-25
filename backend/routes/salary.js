const express = require('express');
const { createSalary, getAllSalaries, getOneSalary } = require('../controllers/salaryController');
const { isAuthenticatedUser } = require('../middlewares/auth');
const router = express.Router();

router.route('/salary/create').post(createSalary)
router.route('/salary/getAll').get(getAllSalaries)
router.route('/salary/me').get(isAuthenticatedUser, getOneSalary)

module.exports = router;