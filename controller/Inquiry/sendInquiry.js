const inquiryModel = require("../../models/inquiryModel");
const sendThankYouEmail = require("./sendInquieryMail");

const sendInquiryController = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            mobile,
            city,
            state,
            brand,
            model,
            description,
            terms
        } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !mobile || !city || !state || !brand || !model || !terms) {
            return res.status(400).json({
                message: 'All fields are required',
                error: true,
                success: false
            });
        }

        // Create new inquiry entry
        const newInquiry = new inquiryModel({
            firstName,
            lastName,
            email,
            mobile,
            city,
            state,
            brand,
            model,
            description,
            terms,
            status: 'pending', // Default status
        });

        // Save to DB
        const savedInquiry = await newInquiry.save();

        // Send thank you email
        await sendThankYouEmail({
            firstName,
            lastName,
            email,
            mobile,
            city,
            state,
            brand,
            model,
            description,
        });

        // Send success response
        res.status(200).json({
            message: 'Inquiry submitted successfully!',
            data: savedInquiry,
            success: true,
            error: false
        });

    } catch (error) {
        res.status(500).json({
            message: error.message || 'Internal Server Error',
            error: true,
            success: false
        });
    }
};

module.exports = sendInquiryController;
