const productModel = require("../../models/productModel");
const deleteProductPermission = require("../../helper/permission")
const deleteCarController = async (req, res) => {
    try {
        console.log("request delete --- ", req.userId);

        if (!deleteProductPermission(req.userId)) {
            throw new Error("Permission denied")
        }
        const { _id } = req.body;
        console.log("id---", req.body);

        if (!_id) {
            return res.status(400).json({ message: "Product ID is required", error: true, success: false });
        }
        const deleteProduct = await productModel.findByIdAndDelete(_id);
        console.log("deleteproduct ----- ", deleteProduct);

        if (!deleteProduct) {
            return res.status(404).json({ message: "Product not found", error: true, success: false });
        }
        res.json({
            message: "Record deleted successfully!",
            success: true,
            error: false
        });

    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

module.exports = deleteCarController;
