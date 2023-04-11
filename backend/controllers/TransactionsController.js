const asyncHandler = require('express-async-handler')
const TransactionsModel = require("../models/TransactionsModel")
// const User = require('../models/UserModel')
const { TokenVerification } = require('../middlewares/Auth')

// Get All users
const GetAllTransactions = asyncHandler(async (req, res) => {
    const token = req.params.token
    TokenVerification(token).then(async (data) => {

        if (data) {
            const result = await TransactionsModel.find({ id: data.id })
            if (result) {
                res.status(200).send(result)
            } else {
                res.status(222).send("Something is wrong.")
            }
        }
        else
        {
            res.status(222).send("invalid token.")
        }
    })

})

module.exports = { GetAllTransactions }