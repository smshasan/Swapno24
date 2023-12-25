const express = require('express');
const router = express.Router();
const passport = require('passport');

const { registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
    getUserProfile,
    updatePassword,
    updateProfile,
    allUsers,
    getUserDetails,
    updateUser,
    deleteUser,
    logout,
    verifyUser,
    googleLogin

} = require('../controllers/authController');




const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
//const { updateProfile } = require('../../frontend/src/actions/userActions');

router.route('/register').post(registerUser);

// router.route('/google/login').post(googleLogin);

// router.route('/verify/user').post(verifyUser);

router.route('/login').post(loginUser);

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);

router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/me/update').put(isAuthenticatedUser, updateProfile)

router.route('/logout').get(logout);

// router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin', 'vendor'), allUsers);
router.route('/admin/users').get(isAuthenticatedUser, allUsers);

router.route('/user/:id').get(getUserDetails)

router.route('/control/user/:id')
    .get(isAuthenticatedUser, getUserDetails)
    .put(isAuthenticatedUser, updateUser)
    .delete(isAuthenticatedUser, deleteUser)



module.exports = router;