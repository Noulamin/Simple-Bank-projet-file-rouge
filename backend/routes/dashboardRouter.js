const router = require('express').Router()

const {GetAllUsers, SendAmount } = require('../controllers/DashboardController.js')


router.get('/:token', GetAllUsers)
router.post('/SendAmount', SendAmount)
// router.post('/UpdateApartment/:id', UpdateApartment)
// router.post('/DeleteApartment/:id', DeleteApartment)

module.exports = router