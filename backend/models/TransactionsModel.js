const mongoose = require('mongoose')

const TransactionsSchema = new mongoose.Schema({
    _id: {
        default: () => new mongoose.Types.ObjectId().toString(),
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    target: {
        type: String,
        required: true,
    },
    product: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('transactions', TransactionsSchema)