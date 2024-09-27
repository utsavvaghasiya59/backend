const TemporaryUser = require('../../models/temporaryUserModel');
const sendOtpVerificationEmail = require('./sendUserOtp');
const UserOTPVerification = require('../../models/userOtpVeificationModel'); // Import the OTP model

const resendOtpController = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the user exists
        const user = await TemporaryUser.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        console.log("user details resend -----", user);

        // Delete the old OTP record if it exists
        await UserOTPVerification.deleteMany({ userId: user._id });

        // Send a new OTP email
        await sendOtpVerificationEmail({ _id: user._id, email: user.email, name: user.name });

        res.json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

module.exports = resendOtpController;
