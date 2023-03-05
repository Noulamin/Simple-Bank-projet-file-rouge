const router = require('express').Router()

const { AddApartment, UpdateApartment, DeleteApartment, GetAllApartments } = require('../controllers/apartmentController.js')


router.get('/', GetAllApartments)
router.post('/AddApartment', AddApartment)
router.post('/UpdateApartment/:id', UpdateApartment)
router.post('/DeleteApartment/:id', DeleteApartment)

module.exports = router