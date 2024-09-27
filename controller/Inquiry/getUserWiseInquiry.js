const inquiryModel = require("../../models/inquiryModel");

const userWiseInquiryController = async (req, res) => {
    try {
        const userEmail = req.query.email; // Get the email from query parameters
        if (!userEmail) {
            return res.status(400).json({ success: false, message: 'User email is required' });
        }

        const inquiries = await inquiryModel.find({ email: userEmail });
        res.status(200).json({
            success: true,
            data: inquiries
        });
    } catch (error) {
        console.error('Error fetching inquiries:', error);
        res.status(500).json({
            message: error.message || 'Internal Server Error',
            error: true,
            success: false
        });
    }
};

module.exports = userWiseInquiryController;
