const express = require('express');
const {isAuthenticatedUser} = require('../middlewares/auth')
const { createCommission, getAllCommision, getMyCommssion, getCommission } = require('../controllers/commissionController');
const router = express.Router();


router.route('/commission/create').post(createCommission)
router.route('/commission/all').get(getAllCommision)
router.route('/commission/me').get( isAuthenticatedUser, getMyCommssion)
router.route('/commission/:id').get(getCommission)


module.exports = router;