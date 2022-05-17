const Product = require('../models/product');

const catchAsycErrors = require('../middlewares/catchAsyncErrors');



exports.createProduct = catchAsycErrors( async (req, res, next) => {

    const product = await Product.create(req.body);

    res.status(200).json({
        success: true,
        product
    })

})


exports.getProducts = catchAsycErrors(async (req, res, next) => {
    const products = await Product.find();
    
    res.status(200).json({
        success: true,
        products
    })
})