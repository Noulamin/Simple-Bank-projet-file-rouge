const mongoose = require('mongoose')
const crypto = require('crypto')

let password;

const userSchema = new mongoose.Schema({
    _id: {
        default: () => new mongoose.Types.ObjectId().toString(),
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        maxlength: 50,
    },
    balance: {
        default: 0,
        type: Number,
        maxlength: 50,
    },
    emailIsVerified: {
        default: false,
        type: Boolean,
        required: true,
        maxlength: 50,
    },
    hashedPassword: {
        default: () => '',
        type: String,
        required: true,
    }
})

userSchema.methods = {
    authenticated: function (password) {
        return cryptPassword(password) === this.hashedPassword
    },
    cryptNewPassword: function (password) {
        return cryptPassword(password)
    }
}

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

module.exports = mongoose.model('users', userSchema)