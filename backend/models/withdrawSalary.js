const mongoose = require('mongoose');

const withdrawSchema = new mongoose.Schema(
    {
        employeeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Stuff',
        },

        employeeName: {
            type: String,
            required: true
        },

        amount: {
            type: Number,
            required: true
        },

        accountNumber: {
            type: String,
            required: true
        },

        bankName: { type: String, required: true },

        branch: { type: String, required: true },

        withdrawStatus: { type: Boolean, default: false },

    },

    { timestamps: true }
)

module.exports = mongoose.model('WithdrawSalary', withdrawSchema)