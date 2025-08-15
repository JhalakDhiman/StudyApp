const RatingAndReview  = require('../models/RatingAndReview');
const Course = require("../models/Course");
const mongoose = require('mongoose')

exports.createRating = async(req,res)=>{
    try{
        //fetch the details from request body
        console.log("ehllo i am here")
        const userId = req.user.id;
        const {courseId,rating,review} = req.body;

        //check if student is enrolled or not
        const course = await Course.findOne({
            _id: courseId,
            studentsEnrolled: { $elemMatch: { $eq: userId } },
          })

         
        if(!course){
            return res.status(404).json({
                success:false,
                message:"student is not enrolled in this course",
            })
        }
       
        //student has already reviewed or not
        const alreadyReviewed  = await RatingAndReview.findOne({
            course:courseId,
            user:userId,
        })
        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"User has already reveiwed",
            })
        }
       
        //  create rating and review
        const ratingDetails = await RatingAndReview.create({
            rating,review,
            course:courseId,
            user:userId,
        })

        // update course
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,
            {
                $push:{
                    ratingAndReviews:ratingDetails._id,
                }
            },
            {new:true}
        );

        //return response
        return res.status(200).json({
            success:true,
            message:"rating and review created successfully",
            ratingDetails
        })



    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.getAverageRating = async(req,res) =>{
    try{

        const {courseId} = req.body;
         
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId),
                },
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"},
                }
            }
        ] )

        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            })
        }

        return res.status(200).json({
            success:true,
            message:"average rating is 0 , no raating exixst for this course",
            averageRating:0,
        })

    }   catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to get avg rating"
        })
    }
}

exports.getAllRating = async (req, res) => {
    try {
      const allReviews = await RatingAndReview.find({})
        .sort({ rating: "desc" })
        .populate({
          path: "user",
          select: "firstName lastName email image", // Specify the fields you want to populate from the "Profile" model
        })
        .populate({
          path: "course",
          select: "courseName", //Specify the fields you want to populate from the "Course" model
        })
        .exec()
  
      res.status(200).json({
        success: true,
        data: allReviews,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve the rating and review for the course",
        error: error.message,
      })
    }
  }