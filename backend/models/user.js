const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please enter name'],
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },
    phone: {
        type: String,
        required: [true, 'Please enter  valid 11 digit number'],
        // unique: true
        // validate: [validator.isEmail, 'Please enter valid email']
    },
    // email: {
    //     type: String,
    //     required: [true, 'Please enter email'],
    //     unique: true,
    //     validate: [validator.isEmail, 'Please enter valid email']
    // },

    // phone: {
    //     type: String,
    //     unique: true,
    //     minLength: [5, 'Phone Number must not be less than 11 digit'],
    //     required: true
    // },

    // address: {
    //     type: String,
    //     maxLength: [100, 'address must not exceed 100 characters'],
    //     required: true
    // },

    // shopAddress: {
    //     type: String,
    //     maxLength: [100, 'address must not exceed 100 characters'],
    //     required: true

    // },

    password: {
        type: String,
        required: [true, 'Please enter password'],
        minlength: [5, 'Your password must be longer than  6 characters'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true        // true
        },
        url: {
            type: String,
            required: true      // true
        }
    },
    role: {
            type: String,
            default: 'user'
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date


})

//Encrypting Password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// Compares user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// userSchema.methods.comparePassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password)
// }




//Return JWT Token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '72h'
    });
}

module.exports = mongoose.model('User', userSchema);