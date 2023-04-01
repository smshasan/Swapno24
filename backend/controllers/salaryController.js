const Salary = require('../models/salary');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const BankAccount = require('../models/addBankAccount');
const WithdrawSalary = require('../models/withdrawSalary');

exports.createSalary = async (req, res, next) => {

   try {
    const salary = await Salary.create(req.body);
    res.status(201).json({
        success: true,
        salary
    })
    
   } catch (err) {
        res.status(500).json({error})
   }
}

exports.getAllSalaries = async (req, res, next) => {

    try {
        const salaries = await Salary.find();
        res.status(200).json({
            success: true,
            salaries
        })

    } catch (err) {
        res.status(500).json({error: err})
    } 
}

exports.getMySalary = async(req, res, next) => {

    try {
        const salary = await Salary.findOne({stuffId: req.user.id})
        res.status(200).json({
            success: true,
            salary
        })

    } catch (err) {
        res.status(500).json({error: err})
    }
}

exports.addBankAccount = catchAsyncErrors( async function(req, res, next) {

    const bank = await BankAccount.create(req.body)
    res.status(201).json({
        success: true,
        bank
    })
})

exports.getBankAccount = catchAsyncErrors( async function(req, res, next) {
    const bank = await BankAccount.findOne({employeeId: req.user.id})
    res.status(200).json({
        success: true,
        bank
    })
})

exports.withdrawSalary = catchAsyncErrors( async function(req, res, next) {

    const withdraw = await WithdrawSalary.create(req.body)
    res.status(201).json({
        success: true,
        withdraw
    })
})

exports.myWithdrawRequest = catchAsyncErrors( async function(req, res, next) {

    const withdraw = await WithdrawSalary.findOne({employeeId: req.user.id})
    
    res.status(201).json({
        success: true, 
        withdraw
    })
})

exports.withdrawRequests = catchAsyncErrors( async (req, res, next) => {

    const withdraw = await WithdrawSalary.find()
    res.status(200).json({ 
        success: true, 
        withdraw
    })
})




