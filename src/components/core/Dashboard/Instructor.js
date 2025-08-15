import React, { useEffect, useState } from 'react'
import { fetchInstrcutorData } from '../../../services/operations/profileApis'
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsApis'
import { useSelector } from 'react-redux';
import Spinner from '../../common/Spinner'
import { Link, useNavigate } from 'react-router-dom';
import InstructorChart from './InstructorDashboard/InstructorChart'

const Instructor = () => {

  const [instructorDetails, setInstructorDetails] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const [courses, setCourses] = useState(null);
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const instructorDashboard = async () => {
      setLoading(true);
      const instructorData = await fetchInstrcutorData(token);
      const instructorCourses = await fetchInstructorCourses(token);
      console.log("instructorData : ", instructorData);
      console.log("instructorCourses : ", instructorCourses);
      setCourses(instructorCourses);
      setInstructorDetails(instructorData);
      setLoading(false);
    }

    instructorDashboard();
  }, [])

  const totalAmount = instructorDetails?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0);
  const totalStudents = instructorDetails?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0);

  return (
    <div className="w-9/12 mx-auto">
      <div className="flex flex-col gap-1">
        <p className="text-richblack-5 text-[20px] font-semibold">Hi {user.firstName} 👋</p>
        <p className="text-richblack-400 text-[14px]">Let's start something new </p>
      </div>

      {
        loading ? (
          <Spinner />
        ) : (
          courses?.length > 0 ? (
            <div>
              <div className="flex gap-2 mt-4">
                <div className="bg-richblack-800 rounded-md w-[70%] p-2">
                  <p className="text-richblack-5 font-semibold text-[16px]">Visualize</p>
                  <InstructorChart courses={instructorDetails} />
                </div>
                <div className="bg-richblack-800 rounded-md w-[30%] p-3 flex flex-col gap-3">
                  <p className="text-richblack-5 text-[16px] font-semibold">Statistics</p>
                  <div>
                    <p className="text-richblack-300 text-[16px]">Total Courses</p>
                    <p className="text-richblack-5 font-semibold text-[20px]">{courses?.length}</p>
                  </div>
                  <div>
                    <p className="text-richblack-300 text-[16px]">Total Students</p>
                    <p className="text-richblack-5 font-semibold text-[20px]">{totalStudents}</p>
                  </div>
                  <div>
                    <p className="text-richblack-300 text-[16px]">Total Income</p>
                    <p className="text-richblack-5 font-semibold text-[20px]">Rs. {totalAmount}</p>
                  </div>
                </div>
              </div>
              <div className="bg-richblack-800 mt-2 p-2 px-3 rounded-md">
                <div className="flex justify-between">
                  <p className="text-richblack-5 font-semibold ">Your Courses</p>
                  <p className="text-yellow-50 font-semibold text-[15px] cursor-pointer" onClick={() => { navigate('/dashboard/my-courses') }}>view all</p>
                </div>
                <div className="flex justify-between p-2">
                  {
                    courses.slice(0, 3).map((course, index) => (
                      <div key={index} className="w-[32%]">
                        <img className="rounded-md" src={course.thumbnail} />
                        <p className="text-richblack-100 font-semibold">{course.courseName}</p>
                        <div>
                          <p className="text-richblack-200">{course?.studentsEnrolled?.length} students | Rs {course?.price} </p>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          )
            : (
              <div>
                <p>You have not added any courses yet</p>
                <Link to='/dashboard/add-course'>Click to add new Course</Link>
              </div>
            )
        )
      }

    </div>
  )
}

export default Instructor
