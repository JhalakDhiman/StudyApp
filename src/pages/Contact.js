import React from 'react'
import ContactDetails from '../components/core/ContactPage/ContactDetails'
import ContactForm from '../components/core/ContactPage/ContactForm'
import Footer from '../components/common/Footer'
import ReviewSlider from '../components/common/ReviewSlider'

const Contact = () => {
  return (
    <div className="w-full">
      <div className="w-11/12 mx-auto mt-24">
        <div className="flex lg:flex-row flex-col gap-12 mb-12">
          <div className="lg:w-[45%] w-full">
              <ContactDetails/>
          </div>
          <div className="border-[1px] w-full lg:w-[50%] border-richblack-600 flex flex-col items-center rounded-lg p-12 gap-3">

              <h1 className="font-bold text-3xl text-richblack-5 self-start">Got an Idea? We've got the skills. Let's team up</h1>
              <p className="text-[16px] font-semibold text-richblack-400 self-start">Tell us more about yourself and what you're got in mind.</p>
              <ContactForm/>
                 
          </div>
        </div>
        <div>
          <h1 className="font-bold text-4xl text-richblack-25 flex justify-center mb-12">
            Review From Learners
          </h1>
          <ReviewSlider/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Contact
