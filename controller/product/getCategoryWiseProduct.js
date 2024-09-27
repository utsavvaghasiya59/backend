const productModel = require("../../models/productModel")

const getCategoryWiseProduct = async (req, res) => {
    try {
        // console.log(req?.body);

        const { brandName } = req?.body || req?.query
        // console.log("category--,", brandName);

        const product = await productModel.find({ brandName })
        // console.log("Product--", product);

        res.json({
            data: product,
            message: "Product",
            success: true,
            error: false
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
module.exports = getCategoryWiseProduct