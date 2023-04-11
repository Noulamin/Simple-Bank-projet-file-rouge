const asyncHandler = require('express-async-handler')
const TransactionsModel = require("../models/TransactionsModel")
const UserModel = require('../models/UserModel')
const { TokenVerification } = require('../middlewares/Auth')

// Get All users
const GetAllUsers = asyncHandler(async (req, res) => {
    const token = req.params.token
    TokenVerification(token).then(async (data) => {

        if (data) {
            const result = await UserModel.find({});
            if (result) {
                res.send(result).status(200)
            } else {
                res.status(222).send("Something is wrong.")
            }
        }
        else {
            res.status(222).send("invalid token.")
        }
    })

})

// Send Amount
const SendAmount = asyncHandler(async (req, res) => {

    const { token, target, amount } = req.body
    TokenVerification(token).then(async (data) => {

        if (data) {

            let _id = data.id
            let senderData
            let targetData
            UserModel.findOne({ _id }, (error, sender) => {
                if (sender) {
                    senderData = sender
                    _id = target
                    UserModel.findOne({ _id }, (error, user) => {
                        if (user) {
                            targetData = user

                            if (senderData.balance < amount) {
                                return res.status(222).send('insufficient sender balance.')
                            }
                            else {
                                if (senderData._id != targetData._id) {
                                    senderData.balance = parseInt(senderData.balance) - parseInt(amount)
                                    targetData.balance = parseInt(targetData.balance) + parseInt(amount)
                                    updateUserData(senderData._id, senderData)
                                    updateUserData(targetData._id, targetData)

                                    // set transactions
                                    // for target
                                    const targetTransaction = new TransactionsModel({
                                        id: targetData._id,
                                        target: senderData.firstName + ' ' + senderData.lastName,
                                        product: 'Amount received',
                                        amount: '+' + amount,
                                        date: getDateAndTime()
                                    })
                                    targetTransaction.save()
                                    // for sender
                                    const senderTransaction = new TransactionsModel({
                                        id: senderData._id,
                                        target: targetData.firstName + ' ' + targetData.lastName,
                                        product: 'Amount sended',
                                        amount: '-' + amount,
                                        date: getDateAndTime()
                                    })
                                    senderTransaction.save()
                                    return res.status(200).send(amount + '$ has been successfully sent to ' + targetData.firstName + ' ' + targetData.lastName + '.')
                                }
                                else {
                                    return res.status(222).send('You cannot send to yourself.')
                                }
                            }
                        }
                        else {
                            return res.status(222).send('Target not exist anymore.')
                        }

                    })
                }
                else {
                    return res.status(222).send('You are not exist anymore.')
                }
            })
        }
        else {
            return res.status(222).send('invalid token.')
        }
    })
})

// Request Amount
const RequestAmount = asyncHandler(async (req, res) => {

    const { token, target, amount } = req.body
    TokenVerification(token).then(async (data) => {

        if (data) {

            let _id = data.id
            let senderData
            let targetData
            UserModel.findOne({ _id }, (error, sender) => {
                if (sender) {
                    senderData = sender
                    _id = target
                    UserModel.findOne({ _id }, (error, user) => {
                        if (user) {
                            targetData = user

                            if (senderData._id != targetData._id) {
                                const senderTransaction = new TransactionsModel({
                                    id: senderData._id,
                                    target: targetData.firstName + ' ' + targetData.lastName,
                                    product: 'Amount requested',
                                    amount: '+' + amount,
                                    date: getDateAndTime()
                                })
                                senderTransaction.save()
                                return res.status(200).send(amount + '$ has been successfully requested from ' + targetData.firstName + ' ' + targetData.lastName + '.')
                            }
                            else {
                                return res.status(222).send('You cannot request from yourself.')
                            }
                        }
                        else {
                            return res.status(222).send('Target not exist anymore.')
                        }

                    })
                }
                else {
                    return res.status(222).send('You are not exist anymore.')
                }
            })
        }
        else {
            return res.status(222).send('invalid token.')
        }
    })
})

const getDateAndTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const amOrPm = hours < 12 ? 'AM' : 'PM';
    const twelveHourFormat = hours % 12 || 12
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const currentTime = `${twelveHourFormat}:${minutes} ${amOrPm}`;
    return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).toLocaleDateString() + ', ' + currentTime
}

const updateUserData = asyncHandler(async (userId, data) => {

    try {
        await UserModel.findByIdAndUpdate(userId, data)
    } catch (error) {
        console.error(error)
        throw error
    }
})

module.exports = { GetAllUsers, SendAmount, RequestAmount }