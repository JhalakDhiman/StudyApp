import React from 'react'
import HighlightedText from '../HomePage/HighlightedText'
import Button from '../HomePage/Button'

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highliteText: "Anyone, Anywhere",
    description:
      "CodePlay partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "CodePlay partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "CodePlay partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "CodePlay partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "CodePlay partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningGrid = () => {
  return (
    <div className="w-11/12 mx-auto">
      <div className="grid lg:grid-cols-4 invisible lg:visible grid-cols-1 col mt-24">
        {
          LearningGridArray.map((block, index) => (
            <div className={`${index===0?"col-span-2":""}
            ${block.order%2===1 ?"bg-richblack-700":"bg-richblack-800"}
            ${block.order===3?"col-start-2":""}`}>
                {
                  block.order<0 
                  ? (<div className="bg-richblack-900 flex flex-col gap-3 pr-24 lg:h-[289px]">
                      <h1 className="text-4xl text-richblack-25 font-semibold">{block.heading}
                      <br/><HighlightedText text={block.highliteText}/>
                      </h1>
                      <p className="text-[16px] font-semibold text-richblack-300">{block.description}</p>
                      <Button active={true} linkTo={'/signup'}>
                        Learn More
                      </Button>
                  </div>)
                  : (<div className="lg:h-[289px] flex flex-col gap-3 p-7 py-9">
                      <h1 className="font-semibold text-xl text-richblack-25">{block.heading}</h1>
                      <p className="font-semibold text-richblack-400">{block.description}</p>
                  </div>)
                }
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default LearningGrid

