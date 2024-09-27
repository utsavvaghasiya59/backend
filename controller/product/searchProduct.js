const productModel = require("../../models/productModel");

const searchProduct = async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({
                message: "Search query is required",
                error: true,
                success: false
            });
        }

        // Split query into parts for flexible matching
        const queryParts = query.split(' '); // Handle "tatapunch" or "tata punch"
        const regxAny = new RegExp(query, 'i'); // Search for partial or incorrect matches

        // Create regex that tries to match any part of the query (for partial brand/model name input)
        const combinedSearch = queryParts.map(part => new RegExp(part, 'i'));

        // Perform the search on both brandName and modalName
        const product = await productModel.find({
            "$or": [
                { modelName: regxAny },
                { brandName: regxAny },
                {
                    $and: [
                        { brandName: { $in: combinedSearch } },
                        { modelName: { $in: combinedSearch } }
                    ]
                }
            ]
        });

        // If no product is found, provide related search results based on the most likely matches
        if (product.length === 0) {
            const relatedProducts = await productModel.find({
                "$or": [
                    { modelName: { $regex: query, $options: 'i' } },
                    { brandName: { $regex: query, $options: 'i' } }
                ]
            }).limit(5); // Return a few possible related results

            return res.json({
                data: relatedProducts,
                message: 'No exact match found. Here are some related results.',
                error: false,
                success: true
            });
        }

        res.json({
            data: product,
            message: 'Search Product List',
            error: false,
            success: true
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

module.exports = searchProduct;
