const mongoose = require('mongoose')

const salarySchema = new mongoose.Schema({

    stuffId: {
        type: 'String'
    },
    totalSalary: {type: Number}
},

{timestamps: true}

)

module.exports = mongoose.model('Salary', salarySchema)