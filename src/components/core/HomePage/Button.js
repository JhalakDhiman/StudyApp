import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({linkTo,active,children}) => {
  return (
    <div className="w-fit">
      <Link to={linkTo}>
        <div className={` ${active  ? "bg-yellow-50 text-black" : "bg-richblack-800 text-white"}
         px-4 py-3 rounded-md font-bold hover:scale-95 transition-all duration-300
         border-b-[1px] border-r-[1px] border-richblack-500`}>
            {children}
        </div>
      </Link>
    </div>
  )
}

export default Button
