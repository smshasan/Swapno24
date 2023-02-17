const express = require('express');
const { buyTicket, getAllTicket } = require('../controllers/ticketController');

const router = express.Router()

router.route('/ticket').post(buyTicket)
router.route('/ticket/get').get(getAllTicket)

module.exports = router;