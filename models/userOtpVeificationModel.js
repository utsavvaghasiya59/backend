const mongoose = require('mongoose')

const UserVerificationSchema = mongoose.Schema({
    userId: String,
    otp: String,
    expiresAt: Date
}, {
    timestamps: true
})

const UserOTPVeification = mongoose.model("UserOTPVeification", UserVerificationSchema)

module.exports = UserOTPVeification
