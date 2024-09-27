const cityModel = require('../../models/cityModel');

const fetchCityByStateController = async (req, res) => {
    try {
        const { state_name } = req.body;
        const cities = await cityModel.find({ state_name });

        if (!cities || cities.length === 0) {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'No cities found for the specified state'
            });
        }
        res.status(200).json({
            success: true,
            error: false,
            data: cities // Return all matching cities
        });
        console.log(cities);

    } catch (error) {
        res.status(500).json({
            message: error.message || 'Internal Server Error',
            error: true,
            success: false
        });
    }
};

module.exports = fetchCityByStateController;
