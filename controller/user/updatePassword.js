const userModel = require("../../models/userModel");
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Controller to update the password
async function updatePasswordController(req, res) {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                message: "Missing required fields",
                error: true,
                success: false
            });
        }

        const user = await userModel.findById(req.userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isOldPasswordValid) {
            return res.status(400).json({
                message: "Invalid old password",
                error: true,
                success: false
            });
        }

        // Hash the new password and update
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({
            message: "Password updated successfully",
            success: true,
            error: false
        });

    } catch (err) {
        res.status(400).json({
            message: "Error in updating password",
            error: true,
            success: false
        });
    }
}

module.exports = updatePasswordController;
