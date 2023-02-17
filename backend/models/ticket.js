const mongoose = require('mongoose');
const validator = require('validator');

const ticketSchema = new mongoose.Schema({

    from: {
        type: 'String',
        required: true,
    },

    to: {
        type: 'String',
        required: true
    },

    departDate: {
        type: 'Date',
        required: true
    },

    returnDate: {
        type: 'Date',
    },
    carName: {
        type: 'String',
        required: true
    },

    name: { 
        type: 'String', 
        required: true
    },

    phone: {
        type: 'String',
        required: true
    },

    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email']
    }

})

module.exports = mongoose.model('Ticket', ticketSchema)


