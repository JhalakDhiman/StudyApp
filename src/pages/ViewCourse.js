import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsApis';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
import ReviewModal from '../components/core/ViewCourse/ReviewModal';

const ViewCourse = () => {

    const dispatch = useDispatch();
    const { courseId, sectionId, subSectionId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const [reviewModal, setReviewModal] = useState(null);

    useEffect(() => {
        console.log("course id is : ", courseId)
        async function fetchCourse() {
            const courseData = await getFullDetailsOfCourse(courseId, token);
            dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
            dispatch(setEntireCourseData(courseData?.courseDetails));
            dispatch(setCompletedLectures(courseData?.completedVideos));
            let lectures = 0;
            courseData?.courseDetails?.courseContent.forEach((section) => {
                lectures += section?.subSection?.length;
            })
            dispatch(setTotalNoOfLectures(lectures));
        }
        fetchCourse();
    })

    return (
        <div className="w-full h-full relative">
            <div className="flex">
                <VideoDetailsSidebar setReviewModal={setReviewModal} />
                <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto ">
                    <div className="m-6">
                        <Outlet />
                    </div>
                </div>
            </div>
            <div className="absolute">
            {
                reviewModal && <ReviewModal setReviewModal={setReviewModal} />
            }
            </div>

        </div>
    )
}

export default ViewCourse
