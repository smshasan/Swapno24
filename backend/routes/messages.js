const express = require('express')
const router = express.Router()

const Message = require('../models/message')


//add
router.post('/message/create', async function(req, res){
    const newMessage = new Message(req.body);

    try {
        const saved_message = await newMessage.save();
        res.status(200).json({saved_message});
    } catch (err) {
        res.status(500).json({err});
    }
})

//get

router.get('/message/:conversationId', async function(req, res) {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        })
        res.status(200).json({messages})
    } catch (error) {
        res.status(500).json({error})
    }
})

module.exports = router