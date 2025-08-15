import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import IconBtn from '../../../common/IconBtn';
import { useNavigate } from 'react-router-dom';
import { updateProfileDetails } from '../../../../services/operations/settingsApis';

const genders = ["male", "female", "non-binary", "prefer-not to say", "other"]

const EditProfile = () => {

  const { user } = useSelector((state) => state.profile);
  const {token} = useSelector((state)=>state.auth);
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = ()=>{
    buttonRef.current.click();
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const updateProfile = (data) =>{
    try{
      dispatch(updateProfileDetails(token,data));
    } catch(error){
      console.log("error occurred : ",error.message);
    }
  }


  return (
    <div className="flex flex-col gap-4">
      <div className='bg-richblack-800 rounded border border-richblack-700 py-7 px-12 flex flex-col gap-4'>
        <h1 className='text-richblack-5 font-semibold'>Profile Information</h1>

        <div className="flex gap-3">
          <label htmlFor='firstName' className="w-[50%]">
            <p className="text-[0.875rem] leading-[1.375rem] mb-2 text-white opacity-[0.85]">First Name</p>
            <input type="text"
              className="bg-richblack-700 rounded-[0.5rem] text-richblack-300 w-full p-[12px] border-b-[0.05rem] border-[#e6e9db]"
              value={user.firstName}
              disabled={true}
            ></input>
          </label>
          <label htmlFor='lastName' className="w-[50%]">
            <p className="text-[0.875rem] leading-[1.375rem] mb-2 text-white opacity-[0.85]">Last Name</p>
            <input type="text"
              className="bg-richblack-700 rounded-[0.5rem] text-richblack-300 w-full p-[12px] border-b-[0.05rem] border-[#e6e9db]"
              value={user.lastName}
              disabled={true}
            ></input>
          </label>
        </div>

        <form onSubmit={handleSubmit(updateProfile)}>
          <div className="flex flex-col gap-4">

            <div className="flex gap-3">

              <div className="w-[50%] flex flex-col ">

                <label htmlFor='dateOfBirth' className="text-[0.875rem] leading-[1.375rem] mb-2 text-white opacity-[0.85]">Date Of Birth</label>
                <input type="date"
                  className="bg-richblack-700 rounded-[0.5rem] text-richblack-300 w-full p-[12px] border-b-[0.05rem] border-[#e6e9db]"
                  name="dateOfBirth"
                  {...register("dateOfBirth", {
                    required: {
                      value: true,
                      message: "Please enter your date of birth"
                    },
                    max: {
                      value: new Date().toISOString().split('T')[0],
                      message: "date of birth cannot be in future"
                    }
                  })}
                  defaultValue={user?.additionalDetails?.dateOfBirth}
                ></input>
                {
                  errors.dateOfBirth && (
                    <span>{errors.dateOfBirth.message}</span>
                  )
                }

              </div>


              <div className="w-[50%] flex flex-col ">
                <label htmlFor='gender' className="text-[0.875rem] leading-[1.375rem] mb-2 text-white opacity-[0.85]">Gender</label>
                <select type="text"
                  className="bg-richblack-700 rounded-[0.5rem] text-richblack-300 w-full p-[12px] border-b-[0.05rem] border-[#e6e9db]"
                  name="gender"
                  {...register("gender", { required: true })}
                  defaultValue={user?.additionalDetails?.gender}>
                  {
                    genders.map((gender, index) => (
                      <option value={gender} key={index}>{gender}</option>
                    ))
                  }
                </select>
                
              </div>


            </div>

            <div className="flex gap-3">

              <div className="w-[50%] flex flex-col">
                <label htmlFor='contactNumber' className="text-[0.875rem] leading-[1.375rem] mb-2 text-white opacity-[0.85]">Contact Number</label>
                <input type="number"
                  className="bg-richblack-700 rounded-[0.5rem] text-richblack-300 w-full p-[12px] border-b-[0.05rem] border-[#e6e9db]"
                  name="contactNumber"
                  {...register("contactNumber", {
                    required: true,
                    maxLength: {
                      value: 12,
                      message: "Please enter a valid phone number"
                    }
                  })}
                  defaultValue={(user?.additionalDetails?.contactNumber) ? `${user?.additionalDetails?.contactNumber}` : "1234567890"}
                ></input>
                {
                  errors.contactNumber && (
                    <span>{errors.contactNumber.message}</span>
                  )
                }
              </div>

              <div className="w-[50%] flex flex-col">
                <label htmlFor='about' className="text-[0.875rem] leading-[1.375rem] mb-2 text-white opacity-[0.85]">About</label>
                <input type="text"
                  className="bg-richblack-700 rounded-[0.5rem] text-richblack-300 w-full p-[12px] border-b-[0.05rem] border-[#e6e9db]"
                  name="about"
                  {...register("about", { required: true })}
                  defaultValue={(user?.additionalDetails?.about) ? `${user?.additionalDetails?.about}` : "write something about yourself"}
                ></input>
                {
                  errors.about && (
                    <span>{errors.about.message}</span>
                  )
                }
              </div>

            </div>

            <button className="hidden" type="submit" ref={buttonRef}>Submit</button>
          </div>

        </form>
      </div>

      <div className="flex gap-3 self-end">
          <IconBtn 
            onclick={()=>{navigate(-1)}} 
            disabled={false} 
            bgcolor={'richblack-800'}
            textcolor={'richblack-200'} 
            >
              Cancel
          </IconBtn>

          <IconBtn 
            onclick={handleClick} 
            disabled={false} 
            bgcolor={'yellow-50'}
            textcolor={'richblack-900'} 
            >
              Save
          </IconBtn>
      </div>


    </div>
  )
}

export default EditProfile
