const express = require('express');
const router = express.Router();

const { createCourse, getFullCourseDetails ,editCourse, getInstructorCourses, deleteCourse, getCourseDetails} = require('../controllers/Course');
const { auth ,isInstructor,isAdmin, isStudent} = require('../middlewares/auth');
const { createSection, updateSection, deleteSection } = require('../controllers/Section');
const {createSubSection,updateSubSection,deleteSubSection} = require('../controllers/SubSection');
const { createRating, getAllRating, getAverageRating } = require('../controllers/RatingAndReview');
const { createCategory, showAllCategorys, categoryPageDetails } = require('../controllers/Categories');
const { updateCourseProgress } = require('../controllers/CourseProgress');

//course creation etc
router.post('/createCourse',auth,isInstructor,createCourse);
router.post('/getFullCourseDetails',auth,getFullCourseDetails);
router.post('/getCourseDetails',getCourseDetails);
router.post('/editCourse',auth,editCourse);

//course section routes
router.post('/addSection',auth,isInstructor,createSection);
router.post('/updateSection',auth,isInstructor,updateSection);
router.post('/deleteSection',auth,isInstructor,deleteSection);

//course subsection routes 
router.post('/addSubSection',auth,isInstructor,createSubSection);
router.post('/updateSubSection',auth,isInstructor,updateSubSection);
router.post('/deleteSubSection',auth,isInstructor,deleteSubSection);

//course rating and reviews routes
router.post('/createRating',auth,isStudent,createRating);
router.get('/getReviews',getAllRating);  
router.get('/getAverageRating',getAverageRating);

//course categories
router.post('/createCategory',auth,isAdmin,createCategory);
router.get('/showAllCategories',showAllCategorys);
router.post('/getCategoryPageDetails',categoryPageDetails);

router.get('/getInstructorCourses',auth,getInstructorCourses);
router.delete('/deleteCourse',deleteCourse);

//course progress
router.post('/updateCourseProgress',auth,isStudent,updateCourseProgress);

module.exports = router;