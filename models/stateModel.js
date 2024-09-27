const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    name: String,
    country_id: Number,
    country_name: String
});

const StateModel = mongoose.model('state', stateSchema);

module.exports = StateModel;
