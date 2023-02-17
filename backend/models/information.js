const mongoose = require('mongoose');

const informationSchema = new mongoose.Schema({
    residentType: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    fathersName: {
        type: String,
        required: true
    },
    mothersName: {
        type: String,
        required: true
    },
    presentAddress: {
        type: String,
        required: true
    },
    permanentAddress: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },

    nid: {
        type: Number,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('Information', informationSchema)