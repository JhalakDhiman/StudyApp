const express = require('express');
const { updateProfile, deleteAccount, getUserDetails, updateDisplayPicture, getUserEnrolledCourses, instructorDashboard} = require('../controllers/Profile');
const router = express.Router();
const {auth,isInstructor} = require('../middlewares/auth');

router.put('/updateProfile',auth,updateProfile);
router.post('/deleteProfile',auth,deleteAccount);
router.get('/getUserDetails',auth,getUserDetails);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.get("/getUserEnrolledCourses",auth,getUserEnrolledCourses);
router.get("/instructorDashboard",auth,isInstructor,instructorDashboard);

module.exports = router;