import React from 'react'
import { BsEmojiFrownFill } from "react-icons/bs";

const Error = () => {
  return (
    <div className="flex flex-col gap-3 h-[90vh] w-[70vw] justify-center items-center">
      <p className="font-semibold text-4xl w-fit text-center italic text-richblack-200">Error 404 Not Found !</p>
      <BsEmojiFrownFill className="text-yellow-50 text-[30px]"/>
    </div>
  )
}

export default Error
