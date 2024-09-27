//routes/index.js
const express = require('express')

const router = express.Router()



const authToken = require('../middleware/authToken')
const userSignUpController = require('../controller/user/userSignUp')
const userSignIpController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const userLogout = require('../controller/user/userLogout')
const allUser = require('../controller/user/allUser')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryOneProduct')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const verifyOtpController = require('../controller/user/verifyOtp')
const resendOtpController = require('../controller/user/resendOtp')
const deleteCarController = require('../controller/product/deleteCar')
const searchProduct = require('../controller/product/searchProduct')
const fetchStateAndCityController = require('../controller/state/fecthStateAndCity')
const fetchUniqueBrandAndModel = require('../controller/product/fecthUniqueBrandAndModel')
const sendInquiryController = require('../controller/Inquiry/sendInquiry')
const getAllInquiryController = require('../controller/Inquiry/getAllInquiry')
const updateInquiryStatusController = require('../controller/Inquiry/updateInquiryStatus')
const userWiseInquiryController = require('../controller/Inquiry/getUserWiseInquiry')
const fetchStateController = require('../controller/state/fecthStateAndCity')
const fetchCityByStateController = require('../controller/state/fetchCity')
const updatePasswordController = require('../controller/user/updatePassword')
const sendContactDetailsController = require('../controller/Inquiry/sendContactDetails')


router.post("/signup", userSignUpController)
router.post('/verify-otp', verifyOtpController);
router.post('/resend-otp', resendOtpController)
router.post('/update-password', authToken, updatePasswordController)

router.post("/signin", userSignIpController)
router.get('/user-details', authToken, userDetailsController)
router.get('/userLogout', userLogout)
router.post('/google-signin', userSignIpController);
//admin panel

router.get('/all-users', authToken, allUser)
router.post('/update-user', authToken, updateUser)

//upload product
router.post('/upload-product', authToken, UploadProductController)
router.get("/get-product", getProductController)
router.post("/update-product", authToken, updateProductController)
router.get("/get-categoryProduct", getCategoryProduct)
router.post("/category-product", getCategoryWiseProduct)
router.post("/product-details", getProductDetails)
router.get('/search', searchProduct)
//delete Product
router.delete('/delete-product', authToken, deleteCarController)



//get unique brnad name and model name
router.get('/get-uniqueBrandName', authToken, fetchUniqueBrandAndModel)


//send Inquiry
router.post('/send-inquiry', authToken, sendInquiryController)
router.get('/get-inquiries', authToken, getAllInquiryController);
router.post('/update-inquiry-status', authToken, updateInquiryStatusController)
router.get('/getUserInquiry', authToken, userWiseInquiryController)

// get State and City 
router.get('/get-state', fetchStateController)
router.post('/getCityByState', fetchCityByStateController)

//
router.post('/send-Contact-details',sendContactDetailsController)


// router.get('/getStateAndCity', fetchStateAndCityController)
module.exports = router