const express = require('express')
const { newLocation } = require('../controllers/locationController')
const router = express.Router()

router.route('/createLocation').post(newLocation)




module.exports = router