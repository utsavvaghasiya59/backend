const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const TemporaryUser = require('../../models/temporaryUserModel');
const sendOtpVerificationEmail = require('./sendUserOtp');

const userSignUpController = async (req, res) => {
    try {
        const { email, password, name, role } = req.body;
        // console.log("REQUES-BODY-----", req.body);

        if (!email || !password || !name) {
            return res.status(400).json({ message: "All fields are required.", success: false });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists.", success: false });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        const temporaryUser = new TemporaryUser({
            email,
            name,
            password: hashPassword,
            role
        });

        await temporaryUser.save();

        // Send OTP verification email
        await sendOtpVerificationEmail({ _id: temporaryUser._id, email: temporaryUser.email, name: temporaryUser.name });

        return res.status(201).json({
            data: temporaryUser,
            success: true,
            message: "OTP sent to your email. Please verify.",
        });

    } catch (err) {
        console.error("Sign-up error:", err);
        return res.status(500).json({
            message: err.message || "Internal Server Error",
            success: false,
            error: true
        });
    }
};

module.exports = userSignUpController;
