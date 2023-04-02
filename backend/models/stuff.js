const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const stuffSchema = new mongoose.Schema({

    name : {
        type: String,
        required: true,
        maxLength: [20, 'name cannot exceed 20 characters']
    },

    phone: {
        type: String,
        required: [true, 'Please enter valid 11 digit number']
    },

    designation: {
        type: String,
        maxLength: [20, 'Designation cannot exceed 20 characters'],
        default: 'manager'
    },

    department: {
        type: String,
        required: true,
        maxLength: [20, 'Department cannot exceed 20 characters']

    },

    area: {
        type: String,
        required: true,
        maxLength: [20, 'Area cannot exceed 20 characters']

    },

    basicSalary: {
        type: Number,
        required: true
    },

    password: {
        type: String,
        required: true,
        minLength: [5, 'Password must have minimum 5 characters']
    },

    avatar: {
        public_id: {
            type: String,
            required: true
        },
        
        url: {
            type: String,
            required: true
        }
    },

    // area: {
    //     type: String,
    //     default: 'head-office'
    // },

    createdAt: {
        type: Date,
        default: Date.now
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date

})

//Encrypting Password before saving

stuffSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//Compare stuff password
stuffSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//Return JWT Token
stuffSchema.methods.getJwtToken = function () {
    return jwt.sign( { id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '72h'
    });
}

module.exports = mongoose.model('Stuff', stuffSchema);