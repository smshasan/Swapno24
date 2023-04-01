const mongoose = require('mongoose')

const commissionSchema = new mongoose.Schema({

    stuffId: {
        type: 'String'
    },
    commision: {type: Number}
},

{timestamps: true}

)

module.exports = mongoose.model('Commission', commissionSchema)