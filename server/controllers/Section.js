const Course = require('../models/Course');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection')

exports.createSection = async(req,res)=>{
    try{

        //fetch the data from request body
        const {sectionName,courseId} = req.body;

        console.log("section name : ",sectionName);
        console.log("course id : ",courseId);

        //validate the data
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"All the fields are required",
            })
        }
        //create section entry in db
        const sectionDetails = await Section.create({sectionName});
        //add the id of section in course
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
              $push: {
                courseContent: sectionDetails._id,
              },
            },
            { new: true }
          )
            .populate({
              path: "courseContent",
              populate: {
                path: "subSection",
              },
            })
            .exec()
      
          // Return the updated course object in the response
          res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourse,
          })

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error occurred while creating section",
        })
    }
}

exports.updateSection = async(req,res)=>{
   try{
        //fetch data
        const {sectionName,sectionId,courseId} = req.body;
        console.log("section Name : ",sectionName);
        console.log("sectionId : ",sectionId);

        //validate the data
        const section = await Section.findByIdAndUpdate(
            sectionId,
            { sectionName },
            { new: true }
          )
          const course = await Course.findById(courseId)
            .populate({
              path: "courseContent",
              populate: {
                path: "subSection",
              },
            })
            .exec()
          console.log(course)
          res.status(200).json({
            success: true,
            message: section,
            data:course,
          })

   } catch(error){
    return res.status(500).json({
        success:false,
        message:"error occurred while updating section",
    })
   }
    
}

exports.deleteSection = async (req, res) => {
    try {
      const { sectionId, courseId } = req.body
      await Course.findByIdAndUpdate(courseId, {
        $pull: {
          courseContent: sectionId,
        },
      })
      const section = await Section.findById(sectionId)
      console.log(sectionId, courseId)
      if (!section) {
        return res.status(404).json({
          success: false,
          message: "Section not found",
        })
      }
      // Delete the associated subsections
      await SubSection.deleteMany({ _id: { $in: section.subSection } })
  
      await Section.findByIdAndDelete(sectionId)
  
      // find the updated course and return it
      const course = await Course.findById(courseId)
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      res.status(200).json({
        success: true,
        message: "Section deleted",
        data:course,
      })
    } catch (error) {
      console.error("Error deleting section:", error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }