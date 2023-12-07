const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        // required: [true, 'Please enter name'],
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },

    phone: {
        type: String,
        // required: [true, 'Please enter  valid 11 digit number'],

    },

    password: {
        type: String,
        // required: [true, 'Please enter password'],
        minlength: [5, 'Your password must be equal or longer than 5 characters'],
        select: false
    },

    avatar: {
        public_id: {
            type: String,
            // required: true        // true
        },
        url: {
            type: String,
            // required: true      // true
        }
    },

    division: {
        type: String,
        maxLength: [15, 'Product name cannot exceed 15 characters']
    },

    district: {
        type: String,
        maxLength: [15, 'Product name cannot exceed 15 characters']
    },

    thana: {
        type: String,
        maxLength: [15, 'Product name cannot exceed 15 characters']
    },

    municipality: {
        type: String,
        maxLength: [15, 'Product name cannot exceed 15 characters']
    },

    ward: {
        type: String,
        maxLength: [15, 'Product name cannot exceed 15 characters']
    },

    village: {
        type: String,
        maxLength: [15, 'Product name cannot exceed 15 characters']
    },


    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    verificationCode:
    {
        type: String,
        maxlength: 7
    },

    googleId: { type: String },
    email: { type: String},

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



//Return JWT Token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '72h'
    });
}

module.exports = mongoose.model('User', userSchema);