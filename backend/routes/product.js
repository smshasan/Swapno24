const express = require('express')
const router = express.Router();

const {
    
    getProducts,
    getAdminProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getProductsBySlug,
    getDiscountBySlug,
    getProductsByCategory,
    getProductsBySubCategory,
    getUnapprovedProducts,
    approveProduct

} = require('../controllers/productController');


const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


//router.get("/products/:slug", getProductsBySlug);
router.route('/products/:slug').get(getProductsBySlug);
router.route('/discount/:slug').post(getDiscountBySlug);


router.route('/unapproved/products').get(getUnapprovedProducts);
router.route('/approve/product/:id').put(approveProduct)
router.route('/products/fid/:id').get(getProductsByCategory)
router.route('/products/uid/:id').get(getProductsBySubCategory)

// router.route('/products/:name').get(getProductsByCategory)

router.route('/products').get(getProducts);
router.route('/admin/products').get(getAdminProducts);

router.route('/product/:id').get(getSingleProduct);

router.route('/product/new').post(isAuthenticatedUser, newProduct);

router.route('/admin/product/:id')
    .put( isAuthenticatedUser, authorizeRoles('admin', 'vendor'), updateProduct)
    .delete(isAuthenticatedUser, deleteProduct);


module.exports = router;