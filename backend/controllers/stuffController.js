const Stuff = require('../models/stuff');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken.js');

const cloudinary = require('cloudinary')

exports.registerStuff = catchAsyncError( async (req, res, next) => {

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 150,
        crop: 'scale'
    })

    const {name, phone, designation, department, area, password} = req.body;

    const stuff = await Stuff.create({
        name,
        phone,
        designation,
        department,
        area,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    })

    sendToken(stuff, 200, res )

})

//Login Stuff = /api/v1/login/stuff
exports.loginStuff = catchAsyncError( async (req, res, next) => {
    const { phone, password} = req.body;

    //Checks if email and password is entered by Stuff
    if ( !phone || !password ) {
        return next( new ErrorHandler('Please enter phone number & password', 400))
    }

    //Finding Stuff in database
    const stuff = await Stuff.findOne({ phone }).select('+password')

    if (!stuff) {
        return next(new ErrorHandler('Invalid phone or password', 401))
    }

    //Checks if password is correct or not
    const isPasswordMatched = await stuff.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid phone or password', 401));
    }

    sendToken(stuff, 200, res)
})


//Stuff Details 
exports.AllStuffs = catchAsyncError(async (req, res, next) => {

    const stuff = await Stuff.find();

    res.status(200).json({
        success: true,
        stuff
    })
})


// Get user details   =>   /api/v1/admin/stuff/:id
exports.getStuffDetails = catchAsyncError(async (req, res, next) => {
    const stuff = await Stuff.findById(req.params.id);

    if (!stuff) {
        return next(new ErrorHandler(`Stuff does not found with id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        stuff
    })
})

//Get currently logged in user details => /api/v1/stuff/me
exports.loadStuff = catchAsyncError(async (req, res, next) => {
    // console.log('reqStuff:', req.user)
    const stuff = await Stuff.findById(req.user.id);

    res.status(200).json({
        success: true,
        stuff
    })
})


// Update user profile   =>   /api/v1/admin/stuff/:id
exports.updateStuff = catchAsyncError(async (req, res, next) => {
    const newStuffData = {
        name: req.body.name,
        phone: req.body.phone,
        role: req.body.role
    }

    const stuff = await Stuff.findByIdAndUpdate(req.params.id, newStuffData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

// Delete user   =>   /api/v1/admin/stuff/:id
exports.deleteStuff = catchAsyncError(async (req, res, next) => {
    const stuff = await Stuff.findById(req.params.id);

    if (!stuff) {
        return next(new ErrorHandler(`Stuff does not found with id: ${req.params.id}`))
    }

    // Remove avatar from cloudinary
    const image_id = stuff.avatar.public_id;
    await cloudinary.v2.uploader.destroy(image_id);

    await stuff.remove();

    res.status(200).json({
        success: true,
    })
})

