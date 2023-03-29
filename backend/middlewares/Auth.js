const jwt = require('jsonwebtoken')

// verifie token
exports.TokenVerification = (token) => {
    return new Promise((result) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (!err) {
                result(decoded)
            } else {
                result(false)
            }
        })
    })
}