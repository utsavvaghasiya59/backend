const mongoose = require('mongoose');

// Auto-increment plugin for serial number
const AutoIncrement = require('mongoose-sequence')(mongoose);

const inquirySchema = mongoose.Schema({
    srNo: Number,
    firstName: String,
    lastName: String,
    email: String,
    mobile: String,
    city: String,
    state: String,
    brand: String,
    model: String,
    description: String,
    terms: Boolean,
    status: String
}, {
    timestamps: true
});

inquirySchema.plugin(AutoIncrement, { inc_field: 'srNo' });

const inquiryModel = mongoose.model("inquiry_data", inquirySchema);

module.exports = inquiryModel;
