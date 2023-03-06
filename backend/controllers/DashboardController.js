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

// // Add
// const AddApartment = asyncHandler(async (req, res) => {

//     const { Apartment, Rent_Price, Rented, Expiry_Date } = req.body;
//     if (!Apartment || !Rent_Price || !Rented || !Expiry_Date) {
//         res.status(400).send('Please fill all fields.')
//     }

//     const data = {
//         Apartment: Apartment,
//         Rent_Price: Rent_Price,
//         Rented: Rented,
//         Expiry_Date: Expiry_Date
//     }

//     console.log(data)

//     const result = await apartmentsModel.create(data)
//     if (result) {
//         res.status(200).send("Created successfully.")
//     } else {
//         res.status(404).send("Something is wrong.")
//     }

// })

// // Update
// const UpdateApartment = asyncHandler(async (req, res) => {

//     const { code_promo, pourcentage_promo, date_expiration } = req.body;
//     if (!code_promo || !pourcentage_promo || !date_expiration) {
//         res.status(400).send('Please fill all fields.')
//     }

//     id_promos = req.params.id

//     const result = await apartmentsModel.update(
//         {
//             code_promo: code_promo,
//             pourcentage_promo: pourcentage_promo,
//             date_expiration: date_expiration,
//         },
//         {
//             where: { id_promos: id_promos },
//         }
//     );

//     if (result) {
//         res.status(200).send("Updated successfully.")
//     } else {
//         res.status(404).send("Something is wrong.")
//     }
// })

// // Delete
// const DeleteApartment = asyncHandler(async (req, res) => {

//     id = req.params.id

//     const result = await apartmentsModel.deleteOne({
//         where: { _id: id },
//     });

//     if (result) {
//         res.status(200).send("Deleted successfully.")
//     } else {
//         res.status(404).send("Something is wrong.")
//     }
// })

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