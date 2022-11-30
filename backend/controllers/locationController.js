const Location = require('../models/location')

const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

exports.newLocation = catchAsyncErrors( async (req, res, next) => {
    const location = await Location.create(req.body)
    res.status(200).json({
        success: true,
        location
    })
})

