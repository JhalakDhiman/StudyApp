const {uploadImageToCloudinary} = require('../utils/imageUploader')
const mongoose = require('mongoose');

const User = require('../models/User');
const Profile = require('../models/Profile');
const CourseProgress = require('../models/CourseProgress');
const { convertSecondsToDuration } = require("../utils/secToDuration");
const Course = require('../models/Course');

exports.updateProfile = async(req,res) =>{
    try{

        const {dateOfBirth="",about="",contactNumber="",gender=""} = req.body;
        const userId = req.user.id; 

        const userDetails = await User.findById(userId);
        console.log("user details  : ",userDetails);
        const profileId = userDetails.additionalDetails;
        const profileDetails =await Profile.findById(profileId);
        console.log("Profile details : ",profileDetails );
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;   
        await profileDetails.save();

        const updatedUserDetails = await User.findById(userId)
                        .populate("additionalDetails")
                        .exec();

        return res.status(200).json({
            success:true,
            message:"profile updated succesfully",
            updatedUserDetails,
        })
        
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"error occurred while updating the profile",
        })
    }
}

exports.deleteAccount = async(req,res)=>{
    try{

        const userId = req.user.id;

        const userDetails =await User.findById(userId);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        }

        await Profile.findByIdAndDelete(userDetails.additionalDetails);
        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            success:true,
            message:"account deleted succesfully",
        })

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"error occurred while deleting the account",
        })
    }
}

exports.getUserDetails = async(req,res)=>{
    try{
        const id = req.user.id;

        const userDetails = await User.findById(id)
                                  .populate(additionalDetails)
                                  .exec();

        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"user not found",
            })
        }

        return res.status(200).json({
            success:true,
            message:"user details fetched successfully",
            userDetails,
        })

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getUserEnrolledCourses = async(req,res)=>{
    try {
        const userId = req.user.id
        let userDetails = await User.findOne({
          _id: userId,
        })
          .populate({
            path: "courses",
            populate: {
              path: "courseContent",
              populate: {
                path: "subSection",
              },
            },
          })
          .exec()
        userDetails = userDetails.toObject()
        var SubsectionLength = 0
        for (var i = 0; i < userDetails.courses.length; i++) {
          let totalDurationInSeconds = 0
          SubsectionLength = 0
          for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
            totalDurationInSeconds += userDetails.courses[i].courseContent[
              j
            ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
            userDetails.courses[i].totalDuration = convertSecondsToDuration(
              totalDurationInSeconds
            )
            SubsectionLength +=
              userDetails.courses[i].courseContent[j].subSection.length
          }
          let courseProgressCount = await CourseProgress.findOne({
            courseID: userDetails.courses[i]._id,
            userId: userId,
          })
          courseProgressCount = courseProgressCount?.completedVideos.length
          if (SubsectionLength === 0) {
            userDetails.courses[i].progressPercentage = 100
          } else {
            // To make it up to 2 decimal point
            const multiplier = Math.pow(10, 2)
            userDetails.courses[i].progressPercentage =
              Math.round(
                (courseProgressCount / SubsectionLength) * 100 * multiplier
              ) / multiplier
          }
        }
    
        if (!userDetails) {
          return res.status(400).json({
            success: false,
            message: `Could not find user with id: ${userDetails}`,
          })
        }
        return res.status(200).json({
          success: true,
          data: userDetails.courses,
        })
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        })
      }
}


exports.updateDisplayPicture = async (req, res) => {
    try {
        console.log("i am in updateDisplayPicture");
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  

exports.instructorDashboard = async(req,res) =>{
  try{

    console.log("hllo1");

    const courseDetails = await Course.find({instructor:req.user.id});

    const courseData = courseDetails.map((course)=>{
      const totalStudentsEnrolled = course.studentsEnrolled.length;
      const totalAmountGenerated = totalStudentsEnrolled*(course.price);

      const courseStatsData = {
        _id:course._id,
        courseName:course.courseName,
        courseDescription:course.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated
      }

      return courseStatsData;
    })

    return res.status(200).json({
      success:true,
      message:"Information regarding instructor dashboard fetched successfully",
      courses:courseData,
    })

  } catch(error){
    console.log("Error occurred while making instructor dashboard : ",error);
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

