import React from 'react'
import Button from './Button'
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation'

const CodedBlocks = (
  {
    position,
    heading,
    subheading,
    ctaBtn1,
    ctaBtn2,
    codeBlock,
    codeColor,
    bgGradient
  }
) => {
  return (
    <div className={`flex ${position} mt-16 gap-24 lg:flex-row flex-col`}>

      {/* normal text */}
      <div className="flex flex-col gap-6 lg:w-[50%] w-full mr-24">

        {heading}

        <p className="font-semibold text-[19px] text-richblack-200">{subheading}</p>

        <div className="flex gap-6 mt-4">

            <Button linkTo={ctaBtn1.link} active={ctaBtn1.active}>
              <div className="flex gap-3 items-center">
                {ctaBtn1.btnText}
                <FaArrowRight/>
              </div>
            </Button>
            <Button linkTo={ctaBtn2.link} active={ctaBtn2.active}>
              <div>
                {ctaBtn2.btnText}
              </div>
            </Button>

        </div>

      </div>

      {/* typed text */}
      <div className="lg:w-[50%] w-full relative mr-16 flex -gap-4 border p-3 rounded-lg border-richblack-600">
        {bgGradient}
        <div className="w-[5%] text-richblack-300 flex flex-col">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>
        <div className={`w-[95%] font-bold ${codeColor}`}>
            <TypeAnimation
            sequence={[codeBlock,1000,""]}
            repeat={Infinity}
            cursor={true}
            style={
              {
                whiteSpace:"pre-line",
                display:"block",
              }
            }
            omitDeletionAnimation={true}
            ></TypeAnimation>
        </div>
        <div></div>
      </div>

    </div>
  )
}

export default CodedBlocks
