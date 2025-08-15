import React from 'react'
import HighlightedText from './HighlightedText'
import compare_with_others from '../../../assets/Images/Compare_with_others.svg';
import know_your_progress from '../../../assets/Images/Know_your_progress.svg';
import plan_your_lessons from '../../../assets/Images/Plan_your_lessons.svg';
import Button from './Button';

const LearningLanguageSection = () => {
  return (
    <div className="flex flex-col pt-12 justify-center mb-12 items-center gap-3">
      <div>
        <p className="font-semibold text-richblack-700 text-4xl">Your swiss knife for <HighlightedText text={"learning any language"}/></p>
      </div>
      <div>
        <p className="font-semibold text-center text-richblack-500 text-[17px]">Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking<br></br>, custom schedule and more.</p>
      </div>
      <div className="flex mt-4 justify-center">
        <div className="-mr-36">
          <img src={know_your_progress}></img>
        </div>
        <div className="-mr-40">
          <img src={compare_with_others}></img>
        </div>
        <div>
          <img src={plan_your_lessons}></img>
        </div>
      </div>
      <div>
        <Button active={true} linkTo={'/login'}>
          Learn More
        </Button>
      </div>
    </div>
  )
}

export default LearningLanguageSection
