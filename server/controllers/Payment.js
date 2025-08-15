const {instance} = require('../config/razorpay');
const Course = require('../models/Course');
const CourseProgress = require('../models/CourseProgress')
const User = require('../models/User');
const Razorpay = require('razorpay');
const mailSender  =require('../utils/mailSender');
const crypto = require('crypto')
require('dotenv').config();
const mongoose = require('mongoose');

exports.capturePayment  =async(req,res)=>{
    try{
        const {courses} = req.body;
        const userId = req.user.id;
        if(courses.length===0){
            return res.json({
                success:false,
                message:"please provide course ids"
            })
        }

        let totalAmount = 0;

        for(const course_id of courses){
            let course ;
            try{
                course = await Course.findById(course_id);
                if(!course){
                    return res.status(404).json({
                        success:false,
                        message:"course not found",
                    })
                }
                const uid = new mongoose.Types.ObjectId(userId);
                if(course.studentsEnrolled.includes(uid)){
                    return res.status(200).json({
                        success:false,
                        message:"user is already registered in this course"
                    })
                }
                totalAmount+=course.price;

            }  catch(error){
                console.log(error);
                return res.status(500).json({
                    success:false,
                    message:error.message,
                })
            }
        }

        const options = {
            amount:totalAmount*100,
            currency:"INR",
            receipt:Math.random(Date.now()).toString(),
        }

        try{
            const paymentResponse = await instance.orders.create(options);
            return res.status(200).json({
                success:true,
                data:paymentResponse,
            })   
        } catch(error){
            return res.status(500).json({
                success:true,
                message:"could not initiate order"
            })
        }
    }  catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.verifyPayment = async(req,res)=>{
    try{
        const razorpay_order_id = req.body?.razorpay_order_id;
        const razorpay_payment_id = req.body?.razorpay_payment_id;
        const razorpay_signature = req.body?.razorpay_signature;

        const courses = req.body.courses;
        const userId = req.user.id;

        if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
            return res.status(403).json({
                success:false,
                message:"Could not verify payment"
            })
        }

        let body = razorpay_order_id +"|" +razorpay_payment_id;
        
        const expectedSignature = crypto.createHmac("sha256",process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest("hex")

        if(expectedSignature===razorpay_signature){
            await enrollStudents(courses,userId,res);
            return res.status(200).json({
                success:true,
                message:"payment verified successfully"
            })
        }

    } catch(error){
        return res.status(500).json({
            success:false,
            message:"Payment failed"
        })
    }
}


const enrollStudents = async(courses,userId,res)=>{
    if(!courses || !userId){
        return res.status(404).json({
            succes:false,
            message:"please provide courseId and userId"
        })
    }

    for(const courseId of courses){
        try{
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id:courseId},
                {$push:{studentsEnrolled:userId}},
                {new:true}
               )

               if(!enrolledCourse){
                return res.status(404).json({
                    success:false,
                    message:"course not found"
                })
               }

            const courseProgress = await CourseProgress.create({
                courseID:courseId,
                userId:userId,
                completedVideos:[]
            })

            const enrolledStudent = await User.findByIdAndUpdate(
                userId,
                {$push:
                    {
                        courses:courseId,
                        courseProgress:courseProgress._id
                    }},
                {new:true}
            )

            const emailResponse = await mailSender(enrolledStudent.email,"course enrollment mail",
            "you have successfully enrolled into these courses");


        } catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }
}


exports.paymentSuccessfulEmail = async(req,res)=>{
    const {orderId,paymentId,amount} = req.body;
    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId){
        return res.status(403).json({
            message:"please provide all the details",
            success:false,
        })
    }

    try{
        const student = await User.findById(userId);

        await mailSender(student.email,"Payment verification email",`
        Hello ${student.firstName} your payment has been verified successfully
        `)

    } catch(error){
        console.log("error is coming in sending the email");
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
