const userModel = require("../../models/userModel");

async function allUser(req, res) {
    try {
        // console.log("userId-------------", req.userId);
        const allUser = await userModel.find().sort({ role: 1 });

        res.json({
            message: "All user",
            data: allUser,
            success: true,
            error: false
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = allUser