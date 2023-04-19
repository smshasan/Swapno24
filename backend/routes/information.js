const express = require('express')
const { createInformation, getInformation } = require('../controllers/informationController')
const router = express.Router()


router.post('/information/create', createInformation)
router.get('/information/get', getInformation)


module.exports = router