import React from 'react'
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { BiWorld } from "react-icons/bi";
import { IoCall } from "react-icons/io5";

const ContactDetails = () => {
  return (
    <div className="flex flex-col gap-10 bg-richblack-800 p-12 rounded-3xl lg:h-[67vh]">
        <div>
            <div className="text-richblack-300 text-[24px] flex gap-2">
                <HiChatBubbleLeftRight/>
                <h1 className="text-[18px] font-bold text-richblack-5">Chat on us</h1>
            </div>
            <div>
                <p className="text-[16px] font-semibold text-richblack-300">Our friendly team is here to help.<br/>info@studynotion.com</p>
            </div>
        </div>
        <div>
            <div className="text-richblack-300 text-[24px] flex gap-2">
                    <BiWorld/>
                    <h1 className="text-[18px] font-bold text-richblack-5">Visit us</h1>
            </div>
            <div>
                <p className="text-[16px] font-semibold text-richblack-300">Come and say hello at our office HQ.<br/>Akshya Nagar 1st Block 1st Cross, Rammurthy nagar,<br/> Bangalore-560016</p>
            </div>
        </div>
        <div>
            <div className="text-richblack-300 text-[24px] flex gap-2">
                <IoCall/>
                <h1 className="text-[18px] font-bold text-richblack-5">Call us</h1>
            </div>
            <div>
                <p className="text-[16px] font-semibold text-richblack-300">Mon - Fri From 8am to 5pm<br/>+123 456 7869</p>
            </div>
        </div>
    </div>
  )
}

export default ContactDetails
