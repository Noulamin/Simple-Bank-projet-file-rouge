const router = require('express').Router()

const {GetAllUsers, SendAmount, AddApartment, UpdateApartment, DeleteApartment } = require('../controllers/DashboardController.js')


router.get('/', GetAllUsers)
router.post('/SendAmount', SendAmount)
router.post('/UpdateApartment/:id', UpdateApartment)
router.post('/DeleteApartment/:id', DeleteApartment)

module.exports = router