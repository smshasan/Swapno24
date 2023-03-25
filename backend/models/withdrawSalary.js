const mongoose = require('mongoose');

const withdrawSchema = new mongoose.Schema(
    {

        employeeId: { type: String, required: true },
        amount: { type: Number, required: true}

    },

    { timestamps: true }
)

module.exports = mongoose.model('WithdrawSalary', withdrawSchema)