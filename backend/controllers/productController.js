const Product = require('../models/product')

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary');
const Category = require('../models/category');

exports.newProduct = catchAsyncErrors(async (req, res, next) => {

    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

     let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'products'
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
        
    }

    req.body.images = imagesLinks

    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    console.log('product created', product)
    res.status(201).json({
        success: true,
        product
    })
})

// Get products by slug
exports.getProductsBySlug = (req, res) => {
    const { slug } = req.params;
    Category.findOne({ slug: slug })
        .select('_id')
        .exec((error, category) => {
            if (error) return res.status(400).json({ error });

            if (category) {
                Product.find({ category: category._id })
                    .exec((error, products) => {
                        res.status(200).json({ products });
                    })
            }
                
            // res.status(200).json({ category });
    })
}


//Find unapproved products => /api/v1/products/unapproved/
exports.getUnapprovedProducts = catchAsyncErrors(async (req, res, next) => {

    const products = await Product.find({approved: false});
    res.status(200).json({
        success: true,
        products
    })
})


// db.products.updateOne(
//     { _id: 100 },
//     { $set:
//        {
//          quantity: 500,
//          details: { model: "2600", make: "Fashionaires" },
//          tags: [ "coats", "outerwear", "clothing" ]
//        }
//     }
//  )

//Update => Approve unapporved product => /api/v1/approve/product/:id
exports.approveProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.updateOne({_id: req.params.id}, {$set: {approved: true}});
    res.status(200).json({
        approved: true,
        message: 'Product updated successfully',
        product
    });
                                
                                
})

//find products by main category item /api/v1/products/fid/:id
exports.getProductsByCategory = catchAsyncErrors(async (req, res, next) => {
        // const {id} = req.params
        const id = await Category.find({parentId: req.params.id}).select('_id')
        const products = await Product.find({ $and: [{ category: id}, { approved: true}] })
        res.status(200).json({products})
})

//find products by sub category item /api/v1/products/uid/:id
exports.getProductsBySubCategory = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find({ $and: [{category: req.params.id}, {approved: true}]})
    res.status(200).json({products})
})

exports.getDiscountBySlug = (req, res) => {
    const { slug } = req.params;
    Category.findOne({ slug: slug })
        .select('_id')
        .exec((error, category) => {
            
            if (error) return res.status(400).json({ error });

            if (category) {
                Product.find({ category: category._id })
                    .exec((error, products) => {
                        products.forEach(product => {
                            
                            product.update(product.discount = req.body.discount);
                            product.save();
                            
                        })
                        res.status(200).json({
                            success: true,
                            products
                        });
                    })
            }
    })
}

//Get all the products displaying form database => /api/v1/products?keyword = apple
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

    const resPerPage = 12;
    const productsCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find({approved: true}).sort({date: -1}), req.query)
                       .search()
                        .filter()
                        
    let products = await apiFeatures.query;
    let filteredProductsCount = products.length;
    apiFeatures.pagination(resPerPage)
    
    //  products = await apiFeatures.query;


    res.status(200).json({
        success: true,
        productsCount,
        resPerPage,
        filteredProductsCount,
        products
        
    })
})

//Get all the products (Admin) displaying form database => /api/v1/admin/products
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    })
})

//Get a single product displaying form database => /api/v1/product/:id

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);
    
    if (!product) {
        return next(new ErrorHandler('product not found', 404));
    }
    res.status(200).json({
        success: true,
        product
    })
})


//update  products => /api/v1/admin/product/:id 
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('product not found', 404));
    }

    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    if (images !== undefined) {

        // Deleting images associated with the product
        for (let i = 0; i < product.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }

        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'products'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks

    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
})

//Delete product => /api/v1/admin/product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('product not found', 404));
    }

// Deleting images associated with the product
    for (let i = 0; i < product.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    await product.remove();
    res.status(200).json({
        success: true,
        message: 'Product is deleted.'
    })

})

