const router = require("express").Router();
const passport = require("passport");

// const isAuthenticatedUser = require("../middlewares/auth")
// const jwt = require('jsonwebtoken');

const CLIENT_URL = "http://localhost:3000/";




// const { yourTokenCookieName } = req.cookies;

// // Middleware to verify JWT
// const verifyToken = (req, res, next) => {
//   // Get the token from the cookie
//   const token = req.cookies[yourTokenCookieName];

//   // Check if the token exists
//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   try {
//     // Verify the token
//     const decoded = jwt.verify(token, 'yourSecretKey'); // Use the same secret key

//     // Attach user information to the request
//     req.user = decoded;

//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
// };

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});


router.get("/google/logout", (req, res) => {

  req.logout((err) => {
    if (err) {
      console.error('Error during session destruction:', err);
      return res.status(500).json({
        success: false,
        error: err,
        errMessage: 'Error during session destruction',
      });
    }

    // Redirect to the client URL
    res.redirect(CLIENT_URL);
  });
  
  // Clear session-related cookies
  // req.session.destroy((err) => {
  //   if (err) {
  //     console.error('Error during session destruction:', err);
  //     return res.status(500).json({
  //       success: false,
  //       error: err,
  //       errMessage: 'Error during session destruction',
  //     });
  //   }

  //   // Clear JWT-related cookies (if applicable)
  //   res.clearCookie('token'); // Replace with your actual JWT cookie name

  //   // Perform Google OAuth2.0 logout
  //   req.logout((err) => {
  //     if (err) {
  //       console.error('Error during session destruction:', err);
  //       return res.status(500).json({
  //         success: false,
  //         error: err,
  //         errMessage: 'Error during session destruction',
  //       });
  //     }

  //     // Redirect to the client URL
  //     res.redirect(CLIENT_URL);
  //   });
  // });
});
 


router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);


// const JWT_SECRET_KEY = 'SDJFRUEWONXCCVBBNLJPESCVBTUGRDNFFDORJEPFKDSFJDNDLSFJRJOWRBDASDMNAHWDCNMZFO';

// // Example route handling Google authentication callback
// router.get("/google/callback", passport.authenticate("google", { failureRedirect:"/login/failed" }), (req, res) => {
//   // Generate a JWT token
//   const token = jwt.sign({ userId: req.user._id }, JWT_SECRET_KEY, { expiresIn: '1h' });

//   // Set the token as a cookie
//   res.cookie("token", token, {
//     httpOnly: true,
//     expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // Cookie expiration time (1 hour in this example)
//   });

//   res.redirect(CLIENT_URL);})

// router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

// router.get(
//   "/github/callback",
//   passport.authenticate("github", {
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed",
//   })
// );

// router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed",
//   })
// );

module.exports = router