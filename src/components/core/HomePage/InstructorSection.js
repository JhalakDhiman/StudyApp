import React from 'react'
import instructorImage from '../../../assets/Images/Instructor.png';
import HighlightedText from './HighlightedText';
import Button from './Button';
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div className="flex lg:flex-row flex-col gap-10 justify-center pt-5 items-center">
      <div className="lg:w-[60%] w-full shadow-white shadow-[-20px_-20px_0px_0px] ">
        <img src={instructorImage}></img>
      </div>
      <div className="lg:w-[40%] w-full flex flex-col gap-5 lg:ml-12">
        <h1 className="text-4xl font-semibold text-white">Become an<br></br> <HighlightedText text={"instructor"}/></h1>
        <p className="text-[19px] text-richblack-25 font-semibold">Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
        <Button active={true} linkTo={'/login'}>
            <div className="flex items-center gap-2">
                <h1>Start Teaching Today</h1>
                <FaArrowRight/>
            </div>
        </Button>
      </div>
    </div>
  )
}

export default InstructorSection
