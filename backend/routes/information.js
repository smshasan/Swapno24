const express = require('express')
const { createInformation } = require('../controllers/informationController')
const router = express.Router()


router.post('/information/create', createInformation)


module.exports = router