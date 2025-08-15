const express = require('express');
const router = express.Router();

const {signUp, sendOtp, login, changePassword} = require('../controllers/Auth');
const {resetPasswordToken, resetPassword} = require('../controllers/ResetPassword');
const {auth} = require('../middlewares/auth');

router.post('/signup',signUp);
router.post('/sendOtp',sendOtp);
router.post('/login',login);

router.post('/changePassword',auth,changePassword);

router.post('/resetPasswordToken',resetPasswordToken);
router.post('/resetPassword',resetPassword);


module.exports = router;