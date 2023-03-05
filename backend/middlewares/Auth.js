const jwt = require('jsonwebtoken')
// verifie si token existe
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

//verifie si user est autorisé
// exports.isAuth = (req, res, next) => {
//     let user = req.auth && (req.auth._id == "63b551c52cc9464cc3d868e2")
//     if (!user)
//         return res.status(403).json({
//             error: 'Access denied'
//         })
//     next()
// }