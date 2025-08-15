import React, { useState } from 'react';
import {HomePageExplore} from "../../../data/homepage-explore";
import HighlightedText from './HighlightedText';
import CourseCard from './CourseCard';

const tabNames = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]

const CardSection = () => {

    const [currentTab,setCurrentTab] = useState(tabNames[0]);
    const [currentCourses,setCurrentCourses] = useState(HomePageExplore[0].courses);
    const [clickedCourse,setClickedCourse] = useState(HomePageExplore[0].courses[0].heading);

    function setChanges(value){
        setCurrentTab(value);
        const result = HomePageExplore.filter((element)=>element.tag===value);
        setCurrentCourses(result[0].courses);
        setClickedCourse(result[0].courses[0].heading);
    }

  return (
    <div className="flex flex-col w-full z-10 lg:mt-32 md:mt-32 mt-10 justify-center items-center gap-2 mb-32">

        <div className="text-4xl font-semibold text-white">
            Unlock the <HighlightedText text={"Power of Code"}/>
        </div>

        <div className="text-[19px] font-semibold text-richblack-300">
            Learn to Build Anything You Can Imagine
        </div>

        <div className="flex invisible lg:visible md:visible items-center text-richblack-400 cursor-pointer mt-6 bg-richblack-800 font-bold gap-7 p-1 rounded-full border-b-[1px] border-richblack-500">
            {
                tabNames.map((element,index)=>(
                   <div key={index}
                   className={`${  currentTab===element 
                   ? "bg-richblack-900 text-richblack-25 rounded-full px-5 py-2"
                   : "hover:bg-richblack-900 hover:text-richblack-25 rounded-full px-5 py-2 transition-all duration-200 "}`}
                   onClick={()=>setChanges(element)}
                   >
                        {element}
                   </div> 
                ))
            }
        </div>

        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:mt-16 -mt-9">
            {
                currentCourses.map((course,index)=>(
                    <CourseCard clickedCourse={clickedCourse} setClickedCourse={setClickedCourse} course={course} key={index}/>
                ))
            }
        </div>

    </div>
  )
}

export default CardSection
