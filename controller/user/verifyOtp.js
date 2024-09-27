const UserOTPVeification = require("../../models/userOtpVeificationModel");
const bcrypt = require('bcryptjs');
const TemporaryUser = require('../../models/temporaryUserModel');
const userModel = require("../../models/userModel");

const verifyOtpController = async (req, res) => {
    try {
        const { userId, otp } = req.body;

        if (!userId || !otp) {
            return res.status(400).json({ message: "User ID and OTP are required.", success: false });
        }

        // Find the latest OTP verification record
        const otpRecord = await UserOTPVeification.findOne({ userId }).sort({ createdAt: -1 });
        if (!otpRecord) {
            return res.status(400).json({ message: "Invalid OTP record.", success: false });
        }

        // Check if OTP has expired
        if (Date.now() > otpRecord.expiresAt) {
            await UserOTPVeification.deleteMany({ userId });
            return res.status(400).json({ message: "OTP has expired.", success: false });
        }

        // Compare provided OTP with the hashed OTP in the database
        const isOtpValid = await bcrypt.compare(otp, otpRecord.otp);
        if (!isOtpValid) {
            return res.status(400).json({ message: "Invalid OTP.", success: false });
        }

        // Move user from TemporaryUser to User
        const temporaryUser = await TemporaryUser.findById(userId);
        if (!temporaryUser) {
            return res.status(400).json({ message: "Invalid User ID.", success: false });
        }

        const newUser = new userModel({
            email: temporaryUser?.email,
            name: temporaryUser?.name,
            password: temporaryUser?.password,
            profilePic: temporaryUser?.profilePic || "",
            role: temporaryUser?.role,
            verified: true
        });

        await newUser.save();
        await TemporaryUser.findByIdAndDelete(userId);
        await UserOTPVeification.deleteMany({ userId });

        return res.status(200).json({
            success: true,
            error: false,
            message: "OTP verified and user created successfully."
        });

    } catch (err) {
        console.error("OTP verification error:", err);
        return res.status(500).json({
            message: err.message || "Internal Server Error",
            success: false,
            error: true
        });
    }
};

module.exports = verifyOtpController