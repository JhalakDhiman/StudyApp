import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import { getUserEnrolledCourses } from '../../../services/operations/profileApis';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {

    const { token } = useSelector((state) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        ; (async () => {
            try {
                const res = await getUserEnrolledCourses(token) // Getting all the published and the drafted courses

                // Filtering the published course out
                const filterPublishCourse = res.filter((ele) => ele.status !== "Draft")
                // console.log(
                //   "Viewing all the couse that is Published",
                //   filterPublishCourse
                // )

                setEnrolledCourses(filterPublishCourse)
            } catch (error) {
                console.log("Could not fetch enrolled courses.")
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="text-white w-9/12 mx-auto flex flex-col gap-6 ">
            <h1 className="text-richblack-50 text-2xl font-semibold">Enrolled Courses</h1>
            <div>
                <div className="flex justify-between bg-richblack-600 px-3 py-2 rounded-t-lg">
                    <p className="ml-5">Course Name</p>
                    <p>Durations</p>
                    <p className="mr-16">Progress</p>
                </div>
                <div>
                    {
                        !enrolledCourses ? ("Loading") :
                            (!enrolledCourses.length ?
                                (
                                    <div>
                                        You have not enrolled to any course
                                    </div>
                                ) :
                                (
                                    <div className="flex flex-col">
                                        {
                                            enrolledCourses.map((course, index) => (
                                                <div key={index} className="border-x-[1px] border-b-[1px] border-richblack-500 p-3 flex justify-between">
                                                    <div className="flex gap-3" onClick={() => {
                                                        navigate(
                                                            `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                                                        )
                                                    }}>
                                                        <img className="h-14 w-14 rounded-lg object-cover" src={course.thumbnail}></img>
                                                        <div >
                                                            <p>{course.courseName}</p>
                                                            <p>{
                                                                course.courseDescription.length > 50 ? (
                                                                    `${course.courseDescription.slice(0, 50)}...`
                                                                ) : (course.courseDescription)
                                                            }</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p>{course.duration}</p>
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <p>Progress : {course.progressPercentage || 0}%</p>
                                                        <ProgressBar
                                                            completed={course.progressPercentage || 0}
                                                            height="8px"
                                                            width="200px"
                                                            isLabelVisible={false}
                                                        />
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>))
                    }
                </div>
            </div>
        </div>
    )
}

export default EnrolledCourses
