const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema(

    {
        accountNumber: {
            type: String,
            required: true
        },

        bankName: {
            type: String,
            required: true
        },

        branch: {
            type: String,
            required: true
        },  

        employeeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Stuff',
        },
    },

    { timestamps: true }
)

module.exports = mongoose.model('BankAccount', bankAccountSchema);