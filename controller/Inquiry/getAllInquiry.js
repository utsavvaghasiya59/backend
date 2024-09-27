const inquiryModel = require("../../models/inquiryModel");

const getAllInquiryController = async (req, res) => {
    try {
        const inquiries = await inquiryModel.find();
        res.status(200).json({
            data: inquiries,
            message: 'Inquiries retrieved successfully',
            error: false,
            success: true
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

module.exports = getAllInquiryController;
