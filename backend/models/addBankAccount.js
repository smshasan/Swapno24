const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema(
    {

        employeeId: { type: String, required: true },
        accountNumber: { type: String, required: true },
        branch: { type: String, required: true },
        bankName: { type: String, required: true },

    },
    { timestamps: true }
)

module.exports = mongoose.model('BankAccount', bankAccountSchema);