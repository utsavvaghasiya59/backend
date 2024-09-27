const productModel = require("../../models/productModel")

const getCategoryProduct = async (req, res) => {
    try {
        const productCategory = await productModel.distinct("brandName")
        // console.log("Category--------", productCategory);
        const productByCategory = []
        for (const brandName of productCategory) {
            const product = await productModel.findOne({ brandName })
            if (product) {
                productByCategory.push(product)
            }
        }
        res.status(200).json({
            message: "category Product",
            data: productByCategory,
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

module.exports = getCategoryProduct