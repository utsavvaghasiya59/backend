const productModel = require("../../models/productModel");


const fetchUniqueBrandAndModel = async (req, res) => {
    try {
        const result = await productModel.aggregate([
            {
                $group: {
                    _id: "$brandName", // Group by brand name
                    modelName: { $addToSet: "$modelName" } // Collect unique models for each brand
                }
            },
            {
                $project: {
                    _id: 0,
                    brandName: "$_id", // Rename `_id` to `brand`
                    modelName: 1 // Include the models
                }
            },
            { $sort: { brandName: 1 } } // Sort brands alphabetically
        ]);

        res.status(200).json({
            success: true,
            error: false,
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

module.exports = fetchUniqueBrandAndModel;
