const express = require('express');
const { createCommission, getAllCommision, getMyCommssion } = require('../controllers/commissionController');
const router = express.Router();


router.route('/commission/create').post(createCommission)
router.route('/commission/all').get(getAllCommision)
router.route('/commission/me').get(getMyCommssion)


module.exports = router;