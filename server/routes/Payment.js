const express = require("express");
const { isStudent ,auth} = require("../middlewares/auth");
const { capturePayment, verifyPayment,paymentSuccessfulEmail } = require("../controllers/Payment");
const router = express.Router();

router.post('/capturePayment',auth,isStudent,capturePayment);
router.post('/verifyPayment',auth,isStudent,verifyPayment);
router.post('/sendPaymentSuccessEmail',auth,isStudent,paymentSuccessfulEmail);  

module.exports = router;