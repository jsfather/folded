const mongoose = require('mongoose')

const Schema = mongoose.Schema

const costSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    }
}, {timestamps: true})

module.exports = mongoose.model('Cost', costSchema)

