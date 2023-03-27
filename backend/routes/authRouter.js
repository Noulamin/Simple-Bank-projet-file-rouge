const express = require('express')
const router = express.Router()
const { Login, Register, VerifyEmail, VerifyToken, ForgetPassword, VerifyResetLinksToken, ResetPassword, UpdateUserData, signout } = require("../controllers/AuthController.js")

router.post('/login', Login)
router.post('/register', Register)
router.get('/emailVerification/:token', VerifyEmail)
router.get('/tokenVerification/:token', VerifyToken)
router.get('/forgetpassword/:email', ForgetPassword)
router.get('/resetLinkTokenVerification/:token', VerifyResetLinksToken)
router.post('/resetpassword', ResetPassword)
router.post('/updateUserData', UpdateUserData)
router.get('/logout', signout)

module.exports = router