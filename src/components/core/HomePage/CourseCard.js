import React from 'react'
import { IoIosContacts } from "react-icons/io";
import { FaBalanceScale } from "react-icons/fa";

const CourseCard = ({clickedCourse,course,setClickedCourse}) => {

  return (
    <div className={`w-[360px] lg:w-[30%] bg-richblack-800 py-8 px-7 cursor-pointer flex flex-col gap-16
        ${clickedCourse===course.heading ? "bg-white shadow-[12px_12px_rgba(255,222,33)]" : ""}`}
        onClick={()=>{setClickedCourse(course.heading)}}>
        {/* initial div */}
        <div className="flex flex-col  h-[80%] gap-3">
            <h1 className={` font-semibold text-[19px]
             ${clickedCourse===course.heading ? "text-black" : "text-richblack-50"}`}>
                {course.heading}
            </h1>
            <p className="text-richblack-300 font-semibold">{course.description}</p>
        </div>


        {/* last div */}
        <div className="flex justify-between border-t-2 items-center pt-4 font-semibold text-richblack-300  border-dashed border-richblack-300">

            <div className={`flex items-center gap-2
            ${clickedCourse===course.heading?"text-blue-100" : ""}`}>
                <IoIosContacts/>
                <p>{course.level}</p>
            </div>

            <div className={`flex items-center gap-2
            ${clickedCourse===course.heading?"text-blue-100" : ""}`}>
                <FaBalanceScale/>
                <p>{course.lessonNumber} lessons</p>
            </div>
        </div>
    </div>
  )
}

export default CourseCard
