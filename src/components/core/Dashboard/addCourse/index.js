import React from 'react'
import { GiElectric } from "react-icons/gi";
import RenderSteps from './RenderSteps';

const index = () => {
  return (
    <div  className='flex gap-6 w-9/12 mx-auto'>
      <div className="flex w-7/12 flex-col gap-3 first-letter:">
          <div>
            <h1 className="text-richblack-5 font-bold text-3xl">Add Course</h1>
          </div>
          <div>
            <RenderSteps/>
          </div>
      </div>
      <div className="bg-richblack-800 w-5/12 p-4 h-[360px] rounded-md flex flex-col gap-3">
        <div className="flex gap-3 items-center">
            <GiElectric className="text-yellow-50"/>
            <p className="text-richblack-25 font-bold text-[15px]">Course Upload Tips</p>
        </div>
        <ul  className="text-richblack-25 font-semibold text-[13px] list-disc pl-3 flex flex-col">
            <li>Set the course price option or make it free.</li>
            <li>Standard size for the coure thumbnail is 1024*576.</li>
            <li>Video section creates the course section overview.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>Add topic in the course builder section to create lessons,quizes and assignments.</li>
            <li>Information from the additional data section shows up on course single page.</li>
            <li>Make announcements to notify any important. </li>
            <li>Notes to all enrolled students at once.</li>
        </ul>
      </div>
    </div>
  )
}

export default index
