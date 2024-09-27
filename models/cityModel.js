const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: String,
    state_name: String,
    country_name: String
});

const cityModel = mongoose.model('city', citySchema);

module.exports = cityModel;
