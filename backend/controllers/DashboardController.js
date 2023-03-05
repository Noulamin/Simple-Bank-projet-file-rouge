const asyncHandler = require('express-async-handler')
const apartmentsModel = require("../models/ApartmentsModel");

// Get
const GetAllUsers = asyncHandler(async (req, res) => {

    const result = await apartmentsModel.find({});
    if (result) {
        res.send(result).status(200)
    } else {
        res.status(404).send("Something is wrong.")
    }
})

// Get
const GetAllApartments = asyncHandler(async (req, res) => {

    const result = await apartmentsModel.find({});
    if (result) {
        res.send(result).status(200)
    } else {
        res.status(404).send("Something is wrong.")
    }
})

// Add
const AddApartment = asyncHandler(async (req, res) => {

    const { Apartment, Rent_Price, Rented, Expiry_Date} = req.body;
    if (!Apartment || !Rent_Price || !Rented || !Expiry_Date) {
        res.status(400).send('Please fill all fields.')
    }

    const data = {
        Apartment: Apartment,
        Rent_Price: Rent_Price,
        Rented: Rented,
        Expiry_Date: Expiry_Date
    }

    console.log(data)

    const result = await apartmentsModel.create(data)
    if (result) {
        res.status(200).send("Created successfully.")
    } else {
        res.status(404).send("Something is wrong.")
    }

})

// Update
const UpdateApartment = asyncHandler(async (req, res) => {

    const { code_promo, pourcentage_promo, date_expiration } = req.body;
    if (!code_promo || !pourcentage_promo || !date_expiration) {
        res.status(400).send('Please fill all fields.')
    }

    id_promos = req.params.id

    const result = await apartmentsModel.update(
        {
            code_promo: code_promo,
            pourcentage_promo: pourcentage_promo,
            date_expiration: date_expiration,
        },
        {
            where: { id_promos: id_promos },
        }
    );

    if (result) {
        res.status(200).send("Updated successfully.")
    } else {
        res.status(404).send("Something is wrong.")
    }
})

// Delete
const DeleteApartment = asyncHandler(async (req, res) => {

    id = req.params.id

    const result = await apartmentsModel.deleteOne({
        where: { _id: id },
    });

    if (result) {
        res.status(200).send("Deleted successfully.")
    } else {
        res.status(404).send("Something is wrong.")
    }
})

module.exports = { AddApartment, UpdateApartment, DeleteApartment, GetAllApartments }