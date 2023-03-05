const router = require('express').Router()

const { GetAllTransactions } = require('../controllers/TransactionsController')


router.get('/:token', GetAllTransactions)
// router.post('/AddApartment', AddApartment)
// router.post('/UpdateApartment/:id', UpdateApartment)
// router.post('/DeleteApartment/:id', DeleteApartment)

module.exports = router