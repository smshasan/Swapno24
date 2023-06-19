const express = require('express');
const { addCategory, getCategories, updateCategories, deleteCategories, getPlainCategories } = require('../controllers/categoryController');
const {getProductsByCategory} = require('../controllers/productController')
const router = express.Router();


const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


router.route('/category/create').post(isAuthenticatedUser, authorizeRoles('admin'), /*upload.single("categoryImage"),*/ addCategory)
router.route('/category/getCategory').get(getCategories)
router.route('/category/plainCategory').get(getPlainCategories)
// router.route('/category/getCategory').get(isAuthenticatedUser, authorizeRoles('admin', 'vendor'), getCategories)
router.route('/category/update').put(isAuthenticatedUser, authorizeRoles('admin'), /*upload.array("categoryImage"),*/ updateCategories)
router.route('/category/delete').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteCategories)

router.route('/category/:name').get(getProductsByCategory)

module.exports = router;