import React from 'react'

const data = [
    {
        heading:"5K",
        subheading:"Active Students"
    },
    {
        heading:"10+",
        subheading:"Mentors"
    },
    {
        heading:"200+",
        subheading:"Courses"
    },
    {
        heading:"50+",
        subheading:"Awards"
    }
]

const Stats = () => {
  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-0 gap-2 justify-evenly py-10 w-[100vw] bg-richblack-700">
      {
        data.map((value,index)=>(
            <div className="flex flex-col gap-2 justify-center items-center" key={index}>
                <h1 className="text-3xl font-bold text-richblack-5">{value.heading}</h1>
                <p className="text-[16px] font-semibold text-richblack-400">{value.subheading}</p>
            </div>
        ))
      }
    </div>
  )
}

export default Stats
