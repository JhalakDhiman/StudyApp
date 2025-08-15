const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        trim:true,
    },
    otp:{
        type:Number,
        trim:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expired:5*60
    }
})

async function sendVerificationEmail(email,otp){
    try{

        const mailResponse = await mailSender(email,"Verification Email from StudyNotion",otp);
        console.log("Mail response is : ",mailResponse);

    } catch(error){
        console.log("Error while sending mail : ",error);
    }
}

otpSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})

module.exports = mongoose.model("OTP",otpSchema);