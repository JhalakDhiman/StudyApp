const User = require('../models/User');
const OTP = require('../models/OTP');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const Profile = require('../models/Profile');
const jwt = require('jsonwebtoken');
const mailSender = require('../utils/mailSender');
require('dotenv').config();

exports.sendOtp = async(req,res)=>{
    try{
        console.log("I am in send otp")
        //fetch the email fron request body
        const {email} = req.body;

        //check if user exist with this email id or not
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(401).json({
                success:false,
                message:"user already exists , please log in",
            })
        }

        //create otp to be sent
        var otp = otpGenerator.generate(6,{
            lowerCaseAlphabets:false,
            upperCaseAlphabets:false,
            specialChars:false
        });

        let result = await OTP.findOne({otp});

        //checking for unique otp
        while(result){
            otp = otpGenerator.generate(6,{
                lowerCaseAlphabets:false,
                upperCaseAlphabets:false,
                specialChars:false
            });
            result = await OTP.findOne({otp});
        }

        const otpPayload = {email,otp};

        //creating db entry for otp
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);
        console.log(email);

        //returning response
        res.status(200).json({
            success:true,
            message:"otp sent successfully on the email",
        })

    } catch(error){
        console.log("Error while making entry for otp : ",error);
        return res.status(500).json({
            success:false,
            message:"error while creating otp",
        })
    }
}

exports.signUp = async (req,res)=>{
    try{

        //fetch data from request body
        const{
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp,
        } = req.body;

        console.log(firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp,)

        //check all data has come or not
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success:false,
                message:"Please fill all the fields",
            })
        }

        //password is equal to confirm password or not
        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"passwords doesn't match",
            })
        }

        //user already exist or not
        const userPresent = await User.findOne({email});
        if(userPresent){
            return res.status(400).json({
                success:false,
                message:"user already exists, please login ",
            });
        }

        //find recent otp entry in db
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log("Recent otp is ",recentOtp);
        console.log("otp in req is : ",otp);

        //check otp found or not
        if(recentOtp.length===0){
            return res.status(400).json({
                success:false,
                message:"otp not found",
            })
        }

        //verify the otp
        if(recentOtp[0].otp != otp){
            return res.status(400).json({
                success:false,
                message:"otp is incorrect",
            })
        }

        //hash password
        const hashedPassword =await bcrypt.hash(password,10);

        //make profile to be sent in additional details of the user
        const profileData = await Profile.create({
            dateOfBirth:null,
            gender:null,
            about:null,
            contactNumber:null
        });

        //create db entry
        const userData = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            accountType:accountType,
            additionalDetails:profileData._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        });

        //return response
        return res.status(200).json({
            success:true,
            userData,
            message:"user registered successfully",
        })

    } catch(error){
        console.log("Error while signup : ",error);
        return res.status(500).json({
            success:false,
            message:"error while signup",
        })
    }
} 
exports.login = async(req,res)=>{
    try{
        
        //fetch data from request body
        const {email,password} = req.body;
        console.log("email and password are : ",email,password);

        //validation of data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"all the fields are required",
            })
        }

        //check user exist or not
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered please signup first",
            })
        }
        
        //compare password
        if(await bcrypt.compare(password,user.password)){

            //generate token
            const payload = {
                email:user.email,
                accountType:user.accountType,
                id:user._id,
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            })

            user.token = token;
            user.password = password;

            const options = {
                expiresIn: new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,

            }

            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"user logged in successfully",
            })

        }

        else{
            return res.status(401).json({
                success:false,
                message:"password is incorrect",
            })
        }

       

    } catch(error){
        console.log("Error occurred while logging in : ",error);
        return res.status(500).json({
            success:false,
            message:"Login failure, please try again",
        })
    }
}

exports.changePassword = async(req,res) =>{

   try{
        //get data from request
        //get oldPassword,newPassword,confirmPassword
        const {password,newPassword,confirmPassword} = req.body;

        //validation
        if(!newPassword || !confirmPassword){
            return res.status(403).json({
                success:false,
                message:"all the fields are required",
            })
        }

        if(newPassword!=confirmPassword){
            return res.status(400).json({
                success:false,
                message:"passwords does not match",
            })
        }

        //hash the new password
        const hashedPassword = bcrypt.hash(newPassword,10);

        //change password in db 
        const user = await User.findOneAndUpdate(
            {password},
            { password:hashedPassword},
            {new:true}
        )

        //send email for changed password
        const title = "Password change"
        const body = "Your password has been changed successfully"
        const email = user.email;
        const response = await mailSender(email,title,body);
        console.log(response);

        //response
        return res.status(200).json({
            success:true,
            message:"password has been changed succesfully"
        })

   } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"error while changing password",
        })
   }

}
