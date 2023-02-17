const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Information = require("../models/information");


exports.createInformation = catchAsyncErrors(async (req, res, next) => {
    const information = await Information.create(req.body)
    res.status(200).json({
        success: true,
        information
    })
})