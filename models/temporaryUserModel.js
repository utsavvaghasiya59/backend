const mongoose = require('mongoose');

const temporaryUserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    profilePic: { type: String },
    createdAt: { type: Date, default: Date.now, expires: 3600 }
});

module.exports = mongoose.model('TemporaryUser', temporaryUserSchema);
