const express = require('express');

const { 

    registerStuff, 
    loginStuff, 
    AllStuffs, 
    getStuffDetails, 
    updateStuff, 
    deleteStuff,
    loadStuff

} = require('../controllers/stuffController');

const router = express.Router()

const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth')


router.route('/stuff/create').post(registerStuff)
router.route('/stuff/login').post(loginStuff)
router.route('/stuff/me').get(isAuthenticatedUser, loadStuff)

router.route('/stuff/all').get(isAuthenticatedUser, AllStuffs);


router.route('/stuff/get/:id').get(isAuthenticatedUser, authorizeRoles('admin'), getStuffDetails)
router.route('/stuff/update/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateStuff)
router.route('/stuff/delete/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteStuff)

module.exports = router;