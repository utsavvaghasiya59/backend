const mongoose = require('mongoose');

const ContactFormSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    city: { type: String },
    feedback: { type: String },
    file: { type: String }, // Assuming file is stored as a Base64 string
    agree: { type: Boolean, required: true }, // Ensure this field is here and required
});

const ContactForm = mongoose.model('ContactForm', ContactFormSchema);
module.exports = ContactForm;
