const User = require('../models/user');
const sendToken = require('../utils/jwtToken');


exports.registerUser = async (req, res, next) => {
        
        const { name, phone, password } = req.body;


        const user = await User.create({ name, phone, password });

        // res.status(201).json({
        //         success: true,
        //         user
        // });

        sendToken(user, 200, res);

}

exports.getUser = async (req, res, next) => {

        const user = await User.find()

        // res.status(200).json({
        //         success: true,
        //         user
        // });

        sendToken(user, 200, res);


}