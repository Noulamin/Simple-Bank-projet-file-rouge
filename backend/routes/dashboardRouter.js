const router = require('express').Router()

const {GetAllUsers, SendAmount, RequestAmount } = require('../controllers/DashboardController.js')


router.get('/:token', GetAllUsers)
router.post('/SendAmount', SendAmount)
router.post('/RequestAmount', RequestAmount)
// router.post('/UpdateApartment/:id', UpdateApartment)
// router.post('/DeleteApartment/:id', DeleteApartment)

module.exports = router