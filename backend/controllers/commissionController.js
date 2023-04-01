const Commission = require('../models/commision');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')


exports.createCommission = catchAsyncErrors(async (req, res, next) => {
    const commission = await Commission.create(req.body)
    res.status(201).json({success: true, commission})
})

exports.getAllCommision = catchAsyncErrors(async (req, res, next) => {
    const commission = await Commission.find()
    res.status(200).json({success: true, commission})
})

exports.getMyCommssion = catchAsyncErrors(async (req, res, next) => {
    const commission = await Commission.find({stuffId: req.user.id})
    res.status(200).json({success: true, commission})
})

