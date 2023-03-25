const Salary = require('../models/salary');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

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

exports.getOneSalary = async(req, res, next) => {

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
    
})

