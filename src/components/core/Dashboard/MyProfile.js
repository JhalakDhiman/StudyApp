import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../common/IconBtn'
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { formattedDate } from '../../../utils/dateFormatter';

const MyProfile = () => {

  const {user} = useSelector((state)=>state.profile)
  const navigate = useNavigate();

  const personalDetails = [
  {
    heading:"First Name",
    value:user?.firstName,
  },
  {
    heading:"Last Name",
    value:user?.lastName,
  },
  {
    heading:"Email",
    value:user?.email,
  },
  {
    heading:"Phone Number",
    value:user.additionalDetails.contactNumber?(user.additionalDetails.contactNumber):("phone number"),
  },
  {
    heading:"Gender",
    value:user.gender?(user.gender):("gender"),
  },
  {
    heading:"Date Of Birth",
    value:user.additionalDetails.dateOfBirth?(formattedDate(user.additionalDetails.dateOfBirth)):("dd/mm/yy"),
  },
]

  return (
    <div className="flex flex-col gap-5 w-9/12 mx-auto">
      <h1>My Profile</h1>

      <div className="bg-richblack-800 px-9 py-5 rounded-md flex items-center gap-4">
        <div className="w-[15%]">
          <img className="aspect-square w-[78px] object-cover rounded-full" src={user?.image}></img>
        </div>
        <div className="flex flex-col w-[70%] gap-1 justify-center">
          <p className="font-semibold text-richblack-25">{user?.firstName} {user?.lastName}</p>
          <p className="text-richblack-300 ">{user?.email}</p>
        </div>
        <div className="w-[15%]">
          <IconBtn onclick={()=>{navigate('/dashboard/settings')}} bgcolor={'yellow-50'} textcolor={'richblack-900'} disabled={false}>
           <div className="flex gap-2 items-center">
            <p>Edit</p> 
            <span><FaEdit/></span>
           </div>
          </IconBtn>
        </div>
      </div>

      <div className="bg-richblack-800 px-9 py-5 rounded-md flex items-center">

        <div className="flex w-[85%] flex-col gap-7">
          <p className="text-richblack-25">About</p>
          <p className="text-richblack-300">{
            (user?.additionalDetails?.about)?(user?.additionalDetails?.about):("Write something about yourself")
          }</p>
        </div>
        
        <div className="w-[15%]">
          <IconBtn onclick={()=>{navigate('/dashboard/settings')}} bgcolor={'yellow-50'} textcolor={'richblack-900'} disabled={false}>
           <div className="flex gap-2 items-center">
            <p>Edit</p> 
            <span><FaEdit/></span>
           </div>
          </IconBtn>
        </div>

      </div>

      <div className="bg-richblack-800 px-9 py-5 rounded-md">
          <h1 className="text-richblack-25 font-semibold text-[20px] mb-5">Personal Details</h1>
          <div className="flex">
            <div className="grid w-[85%] grid-cols-2 gap-6">
              {
                personalDetails.map((detail,index)=>(
                  <div key={index} className="flex flex-col gap-0">
                    <p className="text-richblack-200">{detail.heading}</p>
                    <p className="text-richblack-50">{detail.value}</p>
                  </div>
                ))
              }
            </div>
            <div className="w-[15%]">
              <IconBtn onclick={()=>{navigate('/dashboard/settings')}} bgcolor={'yellow-50'} textcolor={'richblack-900'} disabled={false}>
                <div className="flex gap-2 items-center">
                  <p>Edit</p> 
                  <span><FaEdit/></span>
                </div>
              </IconBtn>
            </div>
          </div>
      </div>

    </div>
  )
}

export default MyProfile
