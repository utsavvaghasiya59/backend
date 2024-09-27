// Import the ContactForm model

const ContactForm = require("../../models/ContactModel");

const sendContactDetailsController = async (req, res) => {
    try {
        const { name, email, mobile, city, feedback, agree, file } = req.body;

        // Input validation
        if (!name || !email || !mobile || !agree) {
            return res.status(400).json({
                message: 'Please fill in all required fields',
                success: false,
                error: true,
            });
        }

        // Create a new document using the ContactForm model
        const newContactForm = new ContactForm({
            name,
            email,
            mobile,
            city,
            feedback,
            file,
            agree,
        });

        // Save the document to MongoDB
        await newContactForm.save();

        // Respond with success
        return res.status(200).json({
            message: 'Form submitted successfully!',
            success: true,
            error: false,
            data: newContactForm,  // Optionally return the saved document
        });
    } catch (error) {
        console.error("Error submitting form:", error);
        return res.status(400).json({
            message: 'Failed to submit the form',
            success: false,
            error: true,
        });
    }
};

module.exports = sendContactDetailsController;
