const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors'); 
const sendToken = require('../utils/jwtToken');
// const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');
const { OAuth2Client } = require('google-auth-library');

// const twilio = require('twilio');



// const twilioClient = twilio(process.env.ACCOUNTSID, process.env.AUTHTOKEN);

//Register a user => /api/v1/register
exports.registerUser = catchAsyncError( async (req, res, next) => {
    // try {
        
        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: "scale"
        })
    
        // Generate a random 6-digit verification code
        // const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        // const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        const { name, phone, division, district, thana, municipality, ward, village, password } = req.body;
        const user = await User.create({
            name,
            phone,
            division,
            district,
            thana,
            municipality,
            ward,
            village,
            password,
            avatar: {
                public_id: result.public_id ,
                url: result.secure_url
            },
            
        })
    
        // Send the verification code via SMS using Twilio
        // await twilioClient.messages.create({
        //     body: `Your verification code is: ${verificationCode}`,
        //     to: phone,
        //     from: process.env.TWILIOPHONENUMBER
        //   });
          
        //   res.json({ success: true, message: 'Verification code sent successfully' });

        sendToken(user, 200, res)

    // } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ success: false, message: error });
    //       }
    })

    // Route to verify the verification code /api/v1/verify/user
// exports.verifyUser= async (req, res) => {
//     try {
//       const { phone, verificationCode } = req.body;
  
//       // Find the user by phone number and verification code
//       const user = await User.findOne({ phone, verificationCode });
  
//       if (!user) {
//         return res.status(400).json({ success: false, message: 'Invalid verification code' });
//       }
  
//       // Generate a JWT token for the authenticated user
//     //   const token = jwt.sign({ phoneNumber }, 'your_secret_key');
  
//     //   res.json({ success: true, token });
//     sendToken(user, 200, res)

//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ success: false, message: 'Error verifying verification code' });
//     }
//   };
  
   

//Login User => /api/v1/login
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { phone, password } = req.body;

    //Checks if email and password is entered by user
    if (!phone|| !password) {
        return next(new ErrorHandler('Please enter phone number & password', 400))
    }
    // finding user in database
    const user = await User.findOne({ phone }).select('+password')
    // console.log('user found:', user)

    if (!user) {
        return next(new ErrorHandler('Invalid phone or password', 401));
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid phone or password', 401));
    }

    sendToken(user, 200, res)
})


// Google OAuth route for handling login
exports.googleLogin=  async (req, res) => {
    const { tokenId  } = req.body;
    console.log('tokenId:', req.body)

  try {
    // Verify the Google token on the server
    const client = new OAuth2Client('1014577208458-1sjl2jcaqntovik3c3oknrkvrk62031k.apps.googleusercontent.com'); // Replace with your Google OAuth client ID
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: '1014577208458-1sjl2jcaqntovik3c3oknrkvrk62031k.apps.googleusercontent.com', // Replace with your Google OAuth client ID
    });

    const payload = ticket.getPayload();
    console.log('payload: ' + payload)
    const { sub: googleId, name, email } = payload;

    // Check if the token is valid
    if (!payload.aud || payload.aud !== '1014577208458-1sjl2jcaqntovik3c3oknrkvrk62031k.apps.googleusercontent.com') {
      // The token is not intended for your client
      return res.status(401).json({ success: false, error: 'Invalid Google token audience' });
    }

    // The token is valid, you can proceed with the rest of your logic

    // Check if the user with the given googleId already exists in the database
    const existingUser = await User.findOne({ googleId });

    if (existingUser) {
      // User already exists, send user data
      res.json({ success: true, user: existingUser });
    } else {
      // User doesn't exist, create a new user
      const newUser = new User({ googleId, name, email });
      const savedUser = await newUser.save();
      res.json({ success: true, user: savedUser });
    }

  } catch (error) {
    console.error('Error during Google token verification:', error);
    console.log('Received Token (Error):', tokenId);
    res.status(500).json({ success: false, error: 'Server error during token verification', err: error });
  }
  }




//Forgot Password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new ErrorHandler(`User not found with this email`, 404))
    }
    // Get reset Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;

    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, please ignore it.`
    
    try {

        await sendEmail({
            email: user.email,
            subject: 'NeedBox password recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
})


//Reset Password => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    
    //Hash URL Token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
     
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
        
    })
    console.log(`user is ${user}`);
    if (!user) {
        return next(new ErrorHandler(`Password  reset token is invalid or has been expired`, 400)
        )
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler(`Password doesn't match`, 400))
    }

    // Setup new pasword
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res)



})

//Get currently logged in user details => /api/v1/me
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
    console.log('req', req)
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

//Update / change password => /api/v1/password/update
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    //Check previous prassword
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if (!isMatched) {
        next(new ErrorHandler('Old password is incorrect', 400));
    }

    user.password = req.body.password;
    await user.save();

    sendToken(user, 200, res);
})


//Update user profile => /api/v1/me/update
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

// Update avatar
 if (req.body.avatar !== '') {
        const user = await User.findById(req.user.id)

        const image_id = user.avatar.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: "scale"
        })

        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })

})

// logout user => /api/v1/logout
exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})

// Admin Routes

// Get all users   =>   /api/v1/admin/users
exports.allUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})


// Get user details   =>   /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
})

// Update user profile   =>   /api/v1/control/user/:id
exports.updateUser = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        phone: req.body.phone,
        division: req.body.division,
        district: req.body.district,
        thana: req.body.thana,
        municipality: req.body.municipality,
        ward: req.body.ward,
        village: req.body.village
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

// Delete user   =>   /api/v1/admin/user/:id
exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }

    // Remove avatar from cloudinary
    const image_id = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(image_id);

    await user.remove();

    res.status(200).json({
        success: true,
    })
})