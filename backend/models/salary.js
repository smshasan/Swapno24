const mongoose = require('mongoose')

const salarySchema = new mongoose.Schema({

    stuffId: {
        type: 'String'
    },
    commision: {type: Number},
    basicSalary: {type: Number},
},

{timestamps: true}

)

module.exports = mongoose.model('Salary', salarySchema)