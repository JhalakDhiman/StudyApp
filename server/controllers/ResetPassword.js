const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

exports.resetPasswordToken = async(req,res)=>{
    try{
        //fetch email from req body
        const {email} = req.body;
        console.log("email is : ",email);

        //validate email
        const user =await User.findOne({email});
        if(!user){
            return res.status(403).json({
                success:false,
                message:"The user is not registered",
            })
        }

        //generate token
        const token = crypto.randomUUID();

        //update entry in db
        const updatedDetails = await User.findOneAndUpdate(
            {email},
            {
                token:token,
                resetPasswordExpires:new Date(Date.now()+5*60*1000),
            },
            {new:true}
            );

        //create url
        const url = `http://localhost:3000/reset-password/${token}`
        //send mail
        const response =await  mailSender(email,"Password reset link",
            `Click on the link to change the password : ${url}`
        );
        //response
        return res.status(200).json({
            success:true,
            message:"email to reset password sent successfully",
        })

    }   catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while sending reset mail"
        })
    }
}

exports.resetPassword = async(req,res)=>{
    try{

        const {confirmPassword,password,token} = req.body;

        console.log("confirm password : ",confirmPassword);
        console.log("password : ",password);
        console.log("token : ",token);

        tokenString = String(token)
        
        if(confirmPassword !== password){
            return res.json({
                success:false,
                message:"passwords do not match , fill passwords again",
            })
        }

        const user = await User.findOne({token:tokenString}); 

        if(!user){
            return res.json({
                success:false,
                message:"token is invalid"
            })
        }

        if(user.resetPasswordExpires < Date.now()){
            return res.json({
                success:false,
                message:"token has expired",
            })
        }

        const hashedPassword =await bcrypt.hash(password,10);

        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true}
        );

        return res.status(200).json({
            success:true,
            message:"password updated successfully",
        });


    }   catch(error){
        console.log("Error occurred : ",error);
        return res.status(500).json({
            success:false,
            message:"error while updating the password",
        })
    }
}
