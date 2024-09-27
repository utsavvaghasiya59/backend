const userModel = require("../models/userModel")

const uploadProductPermission = async (userId) => {
    const user = await userModel.findById(userId)
    if (user.role !== 'ADMIN') {
        return false
    }
    return true
}
const deleteProductPermission = async (userId) => {
    const user = await userModel.findById(userId)
    if (user.role !== 'ADMIN') {
        return false
    }
    return true
}

const updatePasswordPermission = async (userId) => {

    const user = await userModel.findById(userId)
    if (!user) {
        return false
    }
    return true
}
module.exports = deleteProductPermission
module.exports = uploadProductPermission
module.exports = updatePasswordPermission