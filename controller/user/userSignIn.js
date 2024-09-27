const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function userSignIpController(req, res) {
    try {
        const { email, password, googleToken } = req.body;

        let user;

        if (googleToken) {
            // Handle Google authentication
            const ticket = await client.verifyIdToken({
                idToken: googleToken,
                audience: process.env.GOOGLE_CLIENT_ID,
            });

            const payload = ticket.getPayload();
            const googleEmail = payload.email;

            user = await userModel.findOne({ email: googleEmail });

            if (!user) {
                user = new userModel({
                    email: googleEmail,
                    name: payload.name,
                    password: '', // No password needed for Google sign-in
                    profilePic: payload.picture || '',
                    role: "GENERAL",
                    verified: payload.email_verified
                });

                await user.save();
            }
        } else {
            // Handle regular authentication
            if (!email || !password) {
                return res.status(400).json({
                    message: "Email and password are required",
                    error: true,
                    success: false
                });
            }

            user = await userModel.findOne({ email });

            if (!user) {
                return res.status(400).json({
                    message: "Invalid credentials",
                    error: true,
                    success: false
                });
            }

            const checkPassword = await bcrypt.compare(password, user.password);

            if (!checkPassword) {
                return res.status(400).json({
                    message: "Invalid credentials",
                    error: true,
                    success: false
                });
            }
        }

        const tokenData = {
            _id: user._id,
            email: user.email,
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '3d' });

        const tokenOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 3 * 24 * 60 * 60 * 1000
        };

        res.cookie("token", token, tokenOptions).json({
            message: "Login successful",
            data: token,
            success: true,
            error: false
        });
    } catch (err) {
        res.status(400).json({
            message: "Authentication failed",
            error: true,
            success: false
        });
    }
}

module.exports = userSignIpController;