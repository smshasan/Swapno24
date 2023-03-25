const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        maxLength: [30, 'Product name cannot exceed 30 characters']
    },

    price: {
        type: String,
        required: true,
        maxLength: [30, 'Product price cannot exceed 30 characters']
    },

    condition: {
        type: String,
        maxLength: [10, 'Product condition cannot exceed 10 characters'],
        default: 'used',
    },

    shopCategory: {
        type: String,
        default: 'retail',
    },

    description: {
        type: String,
        required: true, 
        maxlength: [500, 'Product description cannot exceed 500 characters']
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },

    approved: {
        type: Boolean,
        default: false
    },
    
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],

    division: {
        type: String,
        required: true,
        maxLength: [15, 'Product name cannot exceed 15 characters']
    },

    district: {
        type: String,
        required: true,
        maxLength: [15, 'Product name cannot exceed 15 characters']
    },

    thana: {
        type: String,
        required: true,
        maxLength: [15, 'Product name cannot exceed 15 characters']
    },
    
    municipality: {
        type: String,
        required: true,
        maxLength: [15, 'Product name cannot exceed 15 characters']
    },

    ward: {
        type: String,
        required: true,
        maxLength: [15, 'Product name cannot exceed 15 characters']
    },

    village: {
        type: String,
        required: true,
        maxLength: [15, 'Product name cannot exceed 15 characters']
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    
    createdAt:{
        type: Date,
        default: Date.now(),
    }
   
})

module.exports = mongoose.model('Product', productSchema);