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

    createdAt:{
        type: Date,
        default: Date.now(),
    }
   
})

module.exports = mongoose.model('Product', productSchema);