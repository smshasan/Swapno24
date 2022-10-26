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

    description: {
        type: String,
        required: [true, 'Please enter description']
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
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