const StateModel = require('../../models/stateModel');

const fetchStateController = async (req, res) => {
    try {
        const states = await StateModel.find();
        res.status(200).json({
            success: true,
            error: false,
            data: states
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Internal Server Error',
            error: true,
            success: false
        });
    }
};

module.exports = fetchStateController;
