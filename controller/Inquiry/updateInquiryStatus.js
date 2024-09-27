const inquiryModel = require("../../models/inquiryModel");

const updateInquiryStatusController = async (req, res) => {
    const { inquiryId, status } = req.body; // Get both inquiryId and status from body

    if (!inquiryId || !status) {
        return res.status(400).json({
            message: 'Inquiry ID and status are required',
            error: true,
            success: false
        });
    }

    try {
        // Find the inquiry by ID and update its status
        const updatedInquiry = await inquiryModel.findByIdAndUpdate(
            inquiryId,
            { status }, // Update the status field
            { new: true } // Return the updated document
        );

        if (!updatedInquiry) {
            return res.status(404).json({
                message: 'Inquiry not found',
                error: true,
                success: false
            });
        }

        res.status(200).json({
            message: 'Inquiry status updated successfully',
            data: updatedInquiry,
            error: false,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Internal Server Error',
            error: true,
            success: false
        });
    }
};

module.exports = updateInquiryStatusController;
