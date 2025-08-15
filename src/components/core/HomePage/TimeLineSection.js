import React from 'react'
import logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timelineImage from '../../../assets/Images/TimelineImage.png';

const data  =[
    {
        heading:"Leadership",
        subheading:"Fully committed to the success company",
        image:logo1
    },
    {
        heading:"Responsibility",
        subheading:"Students will always be our top priority",
        image:logo2
    },
    {
        heading:"Flexibility",
        subheading:"The ability to switch is an important skills",
        image:logo3
    },
    {
        heading:"Solve the problem",
        subheading:"Code your way to a solution",
        image:logo4
    }
]

const TimeLineSection = () => {
  return (
    <div className="mb-24  px-10 flex flex-col lg:flex-row gap-36 items-center">
      {/* left section */}

        <div className="flex flex-col gap-16">
            {
                data.map((element,index)=>(
                    <div key={index}>
                        <div className="flex gap-7">
                            <div className="bg-white w-[52px] h-[52px] rounded-full flex items-center justify-center shadow-[#00000012] shadow-[0_0_62px_0]">
                                <img src={element.image}></img>
                            </div>
                            <div>
                                <p className="text-[20px] font-semibold">{element.heading}</p>
                                <p className="text-[16px] text-richblack-500 font-medium">{element.subheading}</p>
                            </div>
                        </div>
                        <div
                        className={`hidden ${index===data.length-1?"hidden":"lg:block"}
                        h-14 border-l-[1px] ml-6 mt-2 -mb-12 border-dotted border-richblack-300`}
                        ></div>
                    </div>
               ))
            }
        </div>

      {/* right section */}

        <div className="relative w-[55%] shadow-blue-200 shadow-[0px_0px_30px_0px]">
            <div className="bg-caribbeangreen-700 invisible lg:visible absolute -bottom-12 left-8 flex justify-between">
                <div className="flex items-center m-8 pr-14 border-r-2 border-caribbeangreen-400 gap-8">
                    <p className="font-bold text-white text-[25px]">10</p>
                    <p className=" text-caribbeangreen-300">YEARS EXPERIENCE</p>
                </div>
                <div className="flex items-center pr-10 gap-12">
                    <p className="font-bold text-white text-[25px]">250</p>
                    <p className=" text-caribbeangreen-300">TYPES OF COURSES</p>
                </div>
            </div>
            <img src={timelineImage} className="shadow-white shadow-[20px_20px_0px_0px] object-cover h-[400px] w-full lg:h-fit"></img>
        </div>

    </div>
  )
}

export default TimeLineSection
