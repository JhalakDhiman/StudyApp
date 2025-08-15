import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

const VideoDetailsSidebar = ({setReviewModal}) => {

  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures } = useSelector((state) => state.viewCourse);

  const location = useLocation();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState(null);
  const [activeSubSection, setActiveSubSection] = useState(null);

  const { sectionId, subSectionId } = useParams();


  useEffect(() => {

    if (!courseSectionData?.length) return;

    const currentSectionIndex = courseSectionData?.findIndex((sid) => sid._id === sectionId);
    const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.findIndex((subId) => subId._id === subSectionId);
    const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
    setActiveSection(courseSectionData?.[currentSectionIndex]?._id);
    setActiveSubSection(activeSubSectionId);


  }, [courseSectionData, courseEntireData, location.pathname])

  return (
    <div className="w-3/12 bg-richblack-800 max-w-[250px] h-[100vh]">
      <div>
        <div className="flex p-3 gap-20 items-center">
          <div className="text-richblack-25 text-[26px]" onClick={()=>{navigate('/dashboard/enrolled-courses')}}>
            <IoChevronBackCircleSharp />
          </div>
          <div>
            <button className="bg-yellow-50 text-richblack-900 px-3 py-2 rounded-md font-semibold"
            onClick={()=>{setReviewModal(true)}}>Add Review</button>
          </div>
        </div>
        <div className="px-2 flex flex-col gap-2 mb-4">
          <p className='text-richblack-5 text-[18px] font-semibold'>{courseEntireData?.courseName}</p>
          <p className="text-richblack-500 font-semibold text-[16px] pb-1 border-b-[1px] border-richblack-500">{completedLectures?.length}/{totalNoOfLectures}</p>
        </div>
        <div>
        {
          courseSectionData?.map((section,index)=>(

            <div  
            className="cursor-pointer"
            onClick={()=>{setActiveSection(section?._id)}}
            key={index}> 
              <div className="bg-richblack-600 text-richblack-25 p-2 flex gap-2 items-center">
                <div>
                  {section.sectionName}
                </div>
                <div className={`${activeSection===section?._id?"rotate-0":"rotate-180"} transition-all duration-100`}>
                  <IoIosArrowDown/>
                </div>
              </div>
              {
                activeSection===section?._id && (
                  <div>
                    {
                      section?.subSection?.map((subsect,index)=>(
                        <div
                        className={`${activeSubSection===subsect._id?"bg-yellow-50 font-semibold text-richblack-800":"hover:bg-richblack-900 text-richblack-5"} p-2 flex gap-2`}
                        key={index}
                        onClick={()=>{
                          navigate(`view-course/${courseEntireData._id}/section/${section?._id}/sub-section/${subsect?._id}`);
                          setActiveSubSection(subsect?._id);
                          }}>

                          <input type="checkbox"
                            checked={completedLectures.includes(subsect?._id)}
                          />
                          {subsect.title}
                        </div>
                      ))
                    }
                  </div>
                )
              }
            </div>
          ))
        }
        </div>
      </div>

    </div>
  )
}

export default VideoDetailsSidebar
