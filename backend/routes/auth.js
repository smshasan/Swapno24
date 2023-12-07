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


// router.get('/auth/google', (req, res) => {
//     const authUrl = passport.authenticate('google', { scope: ['email', 'profile'] })
//     res.json({ authUrl });
//   });

// app.get('/auth/google/callback', 
//     passport.authenticate('google', {
//         successRedirect: '/protected',
//         failureRedirect:'/auth/failure'
//     })
// )

// app.get('/auth/failure', (req, res) => {
//     res.send('Something went wrong...')
// });



// router.get('/auth/google/callback', 
// passport.authenticate('google', {
//     successRedirect:'http://localhost:3000/',
//     failureRedirect:'/login/failed'
// }
// ))

// router.get('/auth/google/callback', (req, res, next) => {
//     passport.authenticate('google', (err, user, info) => {
//       if (err) {
//         return next(err);
//       }
//       if (!user) {
//         // Log an error or additional info if authentication fails
//         console.error("Google authentication failed:", info);
//         return res.redirect('/login/failed');
//       }
//       // Log user information if authentication is successful
//       console.log("Google authentication successful. User:", user);
//       // Redirect to the homepage on successful authentication
//       return res.redirect('http://localhost:3000/');
//     })(req, res, next);
//   });

// router.get('/google', passport.authenticate('google', ['profile', 'email']))

// router.get('/auth/google/callback', async (req, res, next) => {
//    await passport.authenticate('google', (err, user, info) => {
//       if (err) {
//         return next(err);
//       }
//       if (!user) {
//         // Log an error or additional info if authentication fails
//         console.error("Google authentication failed:", info);
//         return res.redirect('/login/failed');
//       }
//       // Log user information if authentication is successful
//       console.log("Google authentication successful. User:", user);
//       // Redirect to the homepage on successful authentication
//       return res.redirect('http://localhost:3000/');
//     })(req, res, next);
//   });


//   router.get('/login/success', async (req, res) => {
//     if(req.user){
//         res.status(200).json({
//             error: false,
//             message: 'Login successful',
//             user: req.user
//         })
//     } else {
//         res.status(403).json({error: true, message: 'Not Authorized'});
//     }
// })

// router.get('/login/failed', (req, res) => {
//     res.status(401).json({ error: true, message: 'Login failed' });
// })


// router.get('/google/logout', function(req, res) {
//     req.logout();
//     res.redirect(process.env.CLIENT_URL)

// });




// function isLoggedIn(req, res, next) {
//     req.user ? next() : res.sendStatus(401)
// }

// router.get('/protected', isLoggedIn, (req, res) => {
//     res.status(200).json({
//         user: req.user.name,
//     })
// });

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
//const { updateProfile } = require('../../frontend/src/actions/userActions');

router.route('/register').post(registerUser);

router.route('/google/login').post(googleLogin);

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