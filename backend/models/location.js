 const mongoose = require('mongoose')

// const {Schema, model} = require('mongoose');

const locationSchema = new Schema({
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
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

})

module.exports = model('Location', locationSchema)