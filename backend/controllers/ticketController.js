const Ticket = require('../models/ticket');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

exports.buyTicket = catchAsyncErrors(async (req, res, next) => {

    const ticket = await Ticket.create(req.body)
    console.log('ticket created', ticket)

    res.status(201).send(
        {success: true,
        ticket 
    })
})


exports.getAllTicket = catchAsyncErrors(async (req, res, next) => {
    const tickets = await Ticket.find()
    res.status(200).json({
        success: true,
        tickets
    })
})