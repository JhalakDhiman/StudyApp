const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = async (req,res, next) => {

    try {
        
        const token = req.body.token || req.cookies.token || req.get("Authorization")?.replace("Bearer ", "");
        console.log("token : ",token);
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }
        try {
            const payload = jwt.verify(token,process.env.JWT_SECRET);
            console.log("payload: ",payload);
            req.user = payload;
        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"Invaild token."
            })
        } 
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success:false,
            message:"Error in validating token"
        })
    }
}

exports.isStudent = async(req,res,next) =>{
    try{
        console.log("Going to check protected route of student");
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for students only",
            })
        }
        console.log("check success")
        next();
    }   catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified,please try again"
        })
    }
}

exports.isInstructor = async(req,res,next) =>{
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Instructors only",
            })
        }
        next();
    }   catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified,please try again"
        })
    }
}

exports.isAdmin = async(req,res,next) =>{
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Admins only",
            })
        }
        next();
    }   catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified,please try again"
        })
    }
}

// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRoaW1hbnN1bml0YTQwN0BnbWFpbC5jb20iLCJhY2NvdW50VHlwZSI6IlN0dWRlbnQiLCJpZCI6IjY2YzJlN2FhYmVmMzA5ODA5OTllZGMyNyIsImlhdCI6MTcyNDM0NDc0NywiZXhwIjoxNzI0MzUxOTQ3fQ.YG5wHjpftw8ePRbzKmIHl-qjR1dRCAPZ98iXJqYO-ZE",