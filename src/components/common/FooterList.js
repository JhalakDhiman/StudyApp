import React from 'react'
import { Link } from 'react-router-dom'

const FooterList = ({data}) => {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <h1 className="text-richblack-25 text-[17px] font-semibold">{data.title}</h1>
      </div>
      <div className="flex flex-col gap-2">
        {
            data.links.map((element,index)=>(
                <div key={index}>
                    <Link to={element.link}>
                        <p className="font-semibold text-richblack-400 text-[13px] hover:text-richblack-100">{element.title}</p>
                    </Link>
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default FooterList
