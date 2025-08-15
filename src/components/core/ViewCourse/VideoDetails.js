import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { markLectureAsComplete } from '../../../services/operations/courseDetailsApis'
import { updateCompletedLectures } from '../../../slices/viewCourseSlice'
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';
import { GoVideo } from "react-icons/go";

const VideoDetails = () => {

  const { sectionId, courseId, subSectionId } = useParams();
  const {
    courseEntireData,
    courseSectionData,
    completedLectures,
    totalNoOfLectures
  } = useSelector((state) => state.viewCourse);

  const { token } = useSelector((state) => state.auth)
  const playerRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [videoData, setVideoData] = useState([]);
  const [previewSrc, setPreviewSrc] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {

    if (!courseSectionData?.length) {
      return;
    }
    if (!courseId || !sectionId || !subSectionId) {
      navigate('/dashboard/enrolled-courses');
    }
    else {
      const filteredData = courseSectionData?.filter((section) => section._id === sectionId);
      const filteredVideoData = filteredData?.[0]?.subSection?.filter((subsect) => subsect._id === subSectionId);
      setVideoData(filteredVideoData?.[0]);
      setPreviewSrc(courseEntireData.thumbnail);
      setVideoEnded(false);
    }

  }, [courseEntireData, courseSectionData, location.pathname])


  const isFirstVideo = () => {
    const currentSecIndex = courseSectionData.findIndex((section) => section._id === sectionId);
    const currentSubSectionIndex = courseSectionData[currentSecIndex].subSection.findIndex((subsect) => subsect._id === subSectionId);
    if (currentSecIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    }
    else {
      return false;
    }
  }

  const goToNextVideo = () => {
    const currentSecIndex = courseSectionData.findIndex((section) => section._id === sectionId);
    const currentSubSectionIndex = courseSectionData[currentSecIndex].subSection.findIndex((subsect) => subsect._id === subSectionId);
    const noOfSubSections = courseSectionData?.[currentSecIndex]?.subSection?.length;

    if (currentSubSectionIndex !== noOfSubSections - 1) {
      const nextSubSectionId = courseSectionData[currentSecIndex]?.subSection?.[currentSubSectionIndex + 1]?._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
    }
    else {
      const nextSectionId = courseSectionData[currentSecIndex + 1]._id;
      const nextSubSectionId = courseSectionData[currentSecIndex + 1]?.subSection?.[0]?._id
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
    }
  }

  const isLastVideo = () => {
    const currentSecIndex = courseSectionData.findIndex((section) => section._id === sectionId);
    const currentSubSectionIndex = courseSectionData[currentSecIndex].subSection.findIndex((subsect) => subsect._id === subSectionId);
    const noOfSubSections = courseSectionData[currentSecIndex].subSection.length;
    const noOfSections = courseSectionData.length;

    if (currentSecIndex === noOfSections - 1 && currentSubSectionIndex === noOfSubSections - 1) {
      return true;
    }
    else {
      return false;
    }
  }

  const goToPrevVideo = () => {
    const currentSecIndex = courseSectionData.findIndex((section) => section._id === sectionId);
    const currentSubSectionIndex = courseSectionData?.[currentSecIndex].subSection.findIndex((subsect) => subsect._id === subSectionId);

    if (currentSubSectionIndex !== 0) {
      const prevSubSectionId = courseSectionData?.[currentSecIndex]?.subSection?.[currentSubSectionIndex - 1]._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
    }
    else {
      const prevSectionId = courseSectionData?.[currentSecIndex - 1]._id;
      const prevSectionLength = courseSectionData?.[currentSecIndex - 1]?.subSection?.length;
      const prevSubSectionId = courseSectionData?.[currentSecIndex - 1]?.subSection?.[prevSectionLength - 1]._id;
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`);
    }
  }

  const handleLectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsComplete({ courseId: courseId, subSectionId: subSectionId }, token)
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-5 text-white ">
      {
        !videoData ? (
          <img src={previewSrc} />
        ) : (
          <div>
            <Player
              ref={playerRef}
              aspect-ratio="16:9"
              playsInline
              className="h-[400px] w-[500px] object-cover"
              onEnded={() => { setVideoEnded(true) }}
              src={videoData?.videoUrl}>

              <GoVideo position="center" />

              <div>
                {
                  videoEnded && (
                    <div
                      style={{
                        backgroundImage:
                          "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                      }}
                      className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
                    >

                      {
                        !completedLectures?.includes(subSectionId) &&
                        <button
                          disabled={loading}
                          onClick={() => { handleLectureCompletion() }}
                          className="bg-yellow-50 text-richblack-900 font-bold text-[14px] px-4 py-3 rounded-md">
                          Mark As Completed
                        </button>
                      }
                      <button
                        disabled={loading}
                        onClick={() => {
                          if (playerRef.current) {
                            playerRef.current.seek(0)
                            setVideoEnded(false)
                          }
                        }}
                        className="bg-richblack-700 text-richblack-5 font-bold text-[14px] px-4 py-3 mt-3 rounded-md">Rewatch</button>

                      <div className="flex gap-3 m-3 justify-center">
                        {
                          !isFirstVideo() &&
                          (<button
                            disabled={loading}
                            onClick={goToPrevVideo}
                            className="bg-yellow-50 text-richblack-900 font-bold text-[14px] px-4 py-3 rounded-md"
                          >
                            Prev
                          </button>)
                        }
                        {
                          !isLastVideo() &&
                          (<button
                            disabled={loading}
                            onClick={goToNextVideo}
                            className="bg-yellow-50 text-richblack-900 font-bold text-[14px] px-4 py-3 rounded-md">
                            Next
                          </button>)
                        }
                      </div>

                    </div>
                  )
                }
              </div>

            </Player>
            <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
            <p className="pt-2 pb-6">{videoData?.description}</p>
          </div>
        )
      }
    </div>
  )
}

export default VideoDetails
