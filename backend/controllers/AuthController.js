const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')
const crypto = require('crypto')
const { transporter } = require('../middlewares/NodeMailer')
const { TokenVerification } = require('../middlewares/Auth')


const Login = asyncHandler((req, res) => {
    const { email, password } = req.body
    User.findOne({ email }, (error, user) => {

        if (!user || error) {
            return res.status(222).send('User not found with this email.')
        }
        // console.log(user)
        if (!user.authenticated(password)) {
            return res.status(222).send('Incorrect password.')
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET
        )
        return res.cookie('token', token, { maxAge: 86400000 }).status(200).send(token)
    })
})

const Register = asyncHandler((req, res) => {
    const { email, password } = req.body
    const data = new User(req.body)
    User.findOne({ email }, (error, user) => {
        if (user) {
            return res.status(200).send("Email already in use.")
        }
        else {
            data.hashedPassword = cryptPassword(password)
            data.save((err, user) => {

                if (err) {
                    return res.status(200).send(err.message)
                }

                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

                transporter.sendMail({
                    from: `"Simple bank" <${process.env.EMAIL}>`,
                    to: user.email,
                    subject: "Verification email for your bank account.",
                    html: `<p>Click <a href="http://localhost:8080/api/auth/emailVerification/${token}">Here</a> to verify your email address.</p>`
                }).then(e => {
                    return res.status(200).send('An email has been sent to your email for verification.')
                })
            })
        }
    })
})

const VerifyEmail = asyncHandler((req, res) => {
    const token = req.params.token
    TokenVerification(token).then(async (data) => {
        if (data) {
            _id = data.id
            User.findOne({ _id }, (error, user) => {
                if (user) {
                    if (!user.emailIsVerified) {
                        let newData = user
                        newData.emailIsVerified = true
                        updateUserData(_id, newData)
                        return res.status(200).send('Account successfully verified.')
                    }
                    else {
                        return res.status(200).send('Account already verified.')
                    }
                }
                else {
                    res.send('Account data not found.')
                }
            })
        }
        else {
            res.send('Invalid token.')
        }
    })
})

const VerifyToken = asyncHandler((req, res) => {
    const token = req.params.token
    TokenVerification(token).then(async (data) => {
        if (data) {
            let _id = data.id
            User.findOne({ _id }, (error, user) => {
                if (user) {
                    let newData = user
                    newData.hashedPassword = undefined
                    return res.status(200).json(newData)
                }
                else {
                    res.clearCookie('token').status(222).send('Account data not found.')
                }
            })
        }
        else {
            res.clearCookie('token').status(222).send('Invalid token.')
        }
    })
})

const ForgetPassword = asyncHandler((req, res) => {
    const email = req.params.email
    User.findOne({ email }, (error, user) => {
        if (user) {
            const token = jwt.sign({ email: email, expireTime: new Date(new Date().getTime() + 5 * 60000) }, process.env.JWT_SECRET)
            transporter.sendMail({
                from: `"Simple bank" <${process.env.EMAIL}>`,
                to: email,
                subject: "Reset password requested for your bank account.",
                html: `<p>Click <a href="http://localhost:3000/resetpassword/${token}">Here</a> to reset your bank account password.</p>
                        <p>Note : this link will expire in 5 minutes.</p>`
            }).then(e => {
                return res.status(200).send('An email has been sent to your email for reseting your password.')
            })
        }
        else {
            res.status(222).send('Account not exist with this email.')
        }
    })
})

const VerifyResetLinksToken = asyncHandler((req, res) => {
    const token = req.params.token
    TokenVerification(token).then(async (data) => {
        if (data) {
            if (new Date().toISOString() < data.expireTime) {
                let email = data.email
                User.findOne({ email }, (error, user) => {
                    if (user) {
                        res.status(200).send('Token is valid.')
                    }
                    else {
                        res.status(222).send('User not found.')
                    }
                })
            }
            else
            {
                res.status(222).send('this link is expired.')
            }
        }
        else {
            res.status(222).send('Invalid token.')
        }
    })
})

const ResetPassword = asyncHandler((req, res) => {
    const { password, token } = req.body
    TokenVerification(token).then(async (data) => {
        if (data) {
            if (new Date().toISOString() < data.expireTime) {
                let email = data.email
                User.findOne({ email }, (error, user) => {
                    if (user) {
                        let newData = user
                        newData.hashedPassword = user.cryptNewPassword(password)
                        updateUserData(user._id, newData)
                        return res.status(200).send('Password successfully updated.')
                    }
                    else {
                        res.status(222).send('User not found.')
                    }
                })
            }
            else
            {
                res.status(222).send('this link is expired.')
            }
        }
        else {
            res.status(222).send('Invalid token.')
        }
    })
})

const updateUserData = asyncHandler(async (userId, data) => {

    try {
        await User.findByIdAndUpdate(userId, data)
    } catch (error) {
        console.error(error)
        throw error
    }
})

const signout = asyncHandler((req, res) => {
    res.clearCookie('token')
    res.json({ message: 'User Signed out' })
})

const cryptPassword = (password) => {
    if (!password) {
        return ''
    }
    else {
        try {
            return crypto.createHmac('sha1', process.env.PASSWORD_SALT)
                .update(password)
                .digest('hex')
        } catch (error) {
            return ''
        }
    }
}

module.exports = { Login, Register, VerifyEmail, VerifyToken, ForgetPassword, VerifyResetLinksToken, ResetPassword, signout }