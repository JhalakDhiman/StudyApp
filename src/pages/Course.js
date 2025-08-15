import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesApis';
import { fetchCourseDetails } from '../services/operations/courseDetailsApis';
import { formattedDate } from '../utils/dateFormatter';
import { IoIosInformationCircleOutline } from "react-icons/io";
import { SlGlobe } from "react-icons/sl";
import GetAvgRating from '../utils/avgRating'
import Spinner from '../components/common/Spinner'
import Footer from '../components/common/Footer'
import RatingStars from '../components/common/RatingStars'
import ConfirmationModal from '../components/common/ConfirmationModal'
import CourseCard from '../components/core/CoursePage/CourseCard';
import { FaChevronDown } from "react-icons/fa6";
import { IoVideocam } from "react-icons/io5";

const Course = () => {

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { loading } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [avgRating, setAvgRating] = useState(null);
  const [lectures, setLectures] = useState(0);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [isActive, setIsActive] = useState([]);

  function activeHandler(sectionId) {
    if (isActive.includes(sectionId)) {
      setIsActive(isActive.filter((sid) => sid !== sectionId));
    }
    else {
      setIsActive([...isActive, sectionId]);
    }
  }

  function handleBuyCourse() {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }
    else {
      setConfirmationModal({
        text1: "You need to login to buy course",
        text2: "Do you want to login ?",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null)
      })
    }
  }

  async function fetchCourse(courseId) {
    const response = await fetchCourseDetails(courseId);
    setCourse(response?.data?.courseDetails);
  }

  useEffect(() => {
    fetchCourse(courseId);
  }, [courseId])

  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReviews);
    setAvgRating(count);
  }, [course])

  useEffect(() => {
    let lecture = 0;
    course?.courseContent?.forEach((section) => {
      lecture += section.subSection.length || 0;
    })
    setLectures(lecture);
  }, [course])

  if (loading || !course) {
    return (
      <div>
        <Spinner />
      </div>
    )
  }
  // if(!course.success){
  //   return <Error/>
  // }

  return (
    <div className="w-full h-full">
      <div>

        <div className="py-28 relative px-10 bg-richblack-800 flex flex-col gap-3">
          <p className="text-richblack-5 text-4xl font-semibold">{course?.courseName}</p>
          <p className="text-richblack-100 text-[20px]">{course?.courseDescription}</p>
          <div className="flex gap-3 items-center text-yellow-50 text-[20px]">
            <p>{avgRating}</p>
            <RatingStars Review_Count={avgRating} />
            <p className="text-richblack-5 text-[20px]">{"("}{course?.ratingAndReviews?.length} reviews{")"}</p>
            <p className="text-richblack-5 text-[20px]">{course?.studentsEnrolled.length} students enrolled</p>
          </div>
          <p className="text-richblack-5 text-[20px]">created by {course?.instructor?.firstName}</p>
          <p className="text-richblack-5 text-[20px] flex items-center">
            <span className="mr-2"><IoIosInformationCircleOutline /></span>
            Created at {formattedDate(course?.createdAt)}|
            <span className="mx-2 ml-4"><SlGlobe /></span>English</p>

          <div className="absolute w-4/12 right-1 top-12">
            <CourseCard courseData={course} handleBuyCourse={handleBuyCourse} />
          </div>
        </div>

        <div className="w-8/12">
          <div className="border-[1px] border-richblack-500 rounded-md p-9 m-12 flex flex-col gap-5">
            <p className="text-richblack-5 text-3xl">What you'll learn</p>
            <p className="text-richblack-5 font-semibold">{course?.whatYouWillLearn}</p>
          </div>
          <div className="ml-12 flex flex-col gap-2 mb-6">
            <p className="text-richblack-5 text-3xl font-semibold">Course Content</p>
            <p className="text-richblack-5 text-[17px]">{course?.courseContent?.length} section(s) {lectures} lecture(s)  </p>
            <div className="border-[1px] border-richblack-600">
              {
                course?.courseContent?.map((section, index) => (
                  <div>
                    <div key={section._id} onClick={() => { activeHandler(section._id) }} className={`bg-richblack-700 text-richblack-5 font-semibold p-5 flex justify-between items-center `}>
                      <div className="flex gap-2 items-center">  
                        <FaChevronDown className={`${isActive.includes(section._id) ? "duration-500 transition-all rotate-180" : ""}`} />
                        Section {index + 1}
                      </div>
                      <div className="text-yellow-50">
                        {section.subSection.length} lecture(s)
                      </div>
                    </div>
                    <div>
                      {
                        section.subSection.map((subSec, index) => (
                          <div className={`bg-richblack-900 ${isActive.includes(section._id) ? "flex" : "hidden"} text-richblack-5 font-semibold p-5 flex gap-2 items-center transition-all duration-300`}><IoVideocam /> {subSec.title}</div>
                        ))
                      }
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {
        confirmationModal && <ConfirmationModal modalData={confirmationModal} />
      }
    </div>

  )
}

export default Course
