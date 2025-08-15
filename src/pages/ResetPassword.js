import React from 'react'
import { useState } from 'react';
import {IoMdArrowRoundBack} from 'react-icons/io';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; 
import {Link, useLocation} from 'react-router-dom'
import { resetPassword } from '../services/operations/authApis';
import { useDispatch } from 'react-redux';
import { FaCheckCircle } from "react-icons/fa";

const ResetPassword = () => {

    const [formData,setFormData] = useState({password:"",confirmPassword:""});
    const [showPassword,setPassword] = useState(false);
    const [showConfirmPassword,setConfirmPassword] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();

    function changeHandler(event){
        setFormData((prevState)=>({
            ...prevState,
            [event.target.name]:event.target.value
        }))
    }

    function handleOnSubmit(event){
        event.preventDefault();
        const token = location.pathname.split("/").at(-1);
        const {password,confirmPassword} = formData;
        dispatch(resetPassword(password,confirmPassword,token));
    }

  return (
    <div className="w-[32vw] h-[90vh] flex flex-col gap-2 justify-center">
      <h1 className="text-3xl font-semibold text-richblack-5">Choose new Password</h1>
      <p className="text-[16px] font-semibold text-richblack-50 mb-2">Almost done . Enter your new password and you're all set</p>
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-5">
        <label className="relative">
            <p className="text-richblack-25 text-[16px] font-semibold">New Password<sup className="text-pink-500">*</sup></p>
            <input
                className="p-2 py-3 w-full bg-richblack-600 text-richblack-25 rounded-md mt-2"
                type={showPassword?"text":"password"}
                required
                name="password"
                value={formData.password}
                placeholder="enter new password"
                onChange={changeHandler}
                ></input>
            <span className="absolute text-[25px] right-3 top-[43px] text-richblack-25"
             onClick={()=>{setPassword(!showPassword)}}>
                {
                    showPassword
                    ?(<AiOutlineEyeInvisible/>)
                    :(<AiOutlineEye/>)
                }
            </span>
        </label>
    

        <label className="relative">
            <p className="text-richblack-25 text-[16px] font-semibold">Confirm New Password<sup className="text-pink-500">*</sup></p>
            <input
                className="p-2 py-3 w-full  bg-richblack-600 text-richblack-25 rounded-md mt-2"
                type={showConfirmPassword?"text":"password"}
                required
                name="confirmPassword"
                value={formData.confirmPassword}
                placeholder="confirm password"
                onChange={changeHandler}
                ></input>
                <span className="absolute text-[25px] right-3 top-[44px] text-richblack-25" onClick={()=>{setConfirmPassword(!showConfirmPassword)}}>
                    {
                        showConfirmPassword
                        ?(<AiOutlineEyeInvisible/>)
                        :(<AiOutlineEye/>)
                    }
                </span>
        </label>

        <div className="grid grid-cols-2">
            <div className="flex gap-1 text-blue-400 items-center">
                <FaCheckCircle/>
                <p>add lowercase characters</p>
            </div>
            <div className="flex gap-1 text-blue-400 items-center">
                <FaCheckCircle/>
                <p>add uppercase characters</p>
            </div>
            <div className="flex gap-1 text-blue-400 items-center">
                <FaCheckCircle/>
                <p>add number characters</p>
            </div>
            <div className="flex gap-1 text-blue-400 items-center">
                <FaCheckCircle/>
                <p>8 character premium</p>
            </div>
            <div className="flex gap-1 text-blue-400 items-center">
                <FaCheckCircle/>
                <p>add lowercase characters</p>
            </div>
        </div>
       

        <button type="submit" 
        className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] -mt-2 font-medium text-richblack-900">
            Reset Password
        </button>
      </form>

      <Link to='/login'>
        <div className="flex items-center gap-2 mt-2">
            <IoMdArrowRoundBack className="text-richblack-5"/>
            <p className="text-richblack-5">Back to Login</p>
        </div>
      </Link>
    </div>
  )
}

export default ResetPassword
