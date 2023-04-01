const express = require('express');

const { 
    createSalary, 
    getAllSalaries, 
    getMySalary, 
    addBankAccount, 
    getBankAccount, 
    withdrawSalary, 
    withdrawRequests, 
    myWithdrawRequest
} = require('../controllers/salaryController');

const { isAuthenticatedUser } = require('../middlewares/auth');

const router = express.Router();

router.route('/salary/create').post(createSalary)
router.route('/salary/getAll').get(getAllSalaries)
router.route('/salary/me').get(isAuthenticatedUser, getMySalary)
router.route('/bankAccount/add').post(isAuthenticatedUser, addBankAccount)
router.route('/bankAccount/details').get(isAuthenticatedUser, getBankAccount)
router.route('/salary/withdraw').post(isAuthenticatedUser, withdrawSalary)
router.route('/salary/withdraw/request').get(isAuthenticatedUser, myWithdrawRequest)
router.route('/salary/withdraw/requests').get(isAuthenticatedUser, withdrawRequests)

module.exports = router;