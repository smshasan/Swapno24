const mongoose = require('mongoose')

const commissionSchema = new mongoose.Schema({

    stuffId: {
        type: 'String'
    },
    commission: {type: Number}
},

{timestamps: true}

)

module.exports = mongoose.model('Commission', commissionSchema)