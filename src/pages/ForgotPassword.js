import React, { useState } from 'react'
import {IoMdArrowRoundBack} from 'react-icons/io'
import { useDispatch } from 'react-redux';
import { resetPasswordToken } from '../services/operations/authApis';
import {Link} from 'react-router-dom'

const ForgotPassword = () => {

    const [email,setEmail] = useState("");
    const [emailSent,setEmailSent] = useState(false);
    const dispatch = useDispatch();

    function onHandleSubmit(event){
        event.preventDefault();
        dispatch(resetPasswordToken(email,setEmailSent));
    }

  return (
    <div className="w-[30vw] h-[90vh] flex justify-center flex-col gap-2">
      <div className="text-4xl self-start font-semibold text-richblack-5">
        {
            emailSent?(<h1>Check Your Email</h1>):(<h1>Reset Your Password</h1>)
        }
      </div>
      <div className="text-[16px] font-semibold text-richblack-100">
        {
            emailSent
            ?(<p>We have sent the reset email to {email}</p>)
            :(<p>Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery</p>)
        }
      </div>
      <form onSubmit={onHandleSubmit}>
            {
                !emailSent && (<div className="flex flex-col  ">
                    <label htmlFor='email' className="text-richblack-25 text-[16px] font-semibold"> Email Address <sup className="text-pink-500">*</sup></label>
                    <input
                    className="p-2 py-3  bg-richblack-600 text-richblack-25 rounded-md mt-2" 
                    type="text"
                    required
                    onChange={(event)=>{setEmail(event.target.value)}}
                    name="email"
                    value={email}
                    placeholder="Enter email address"
                    ></input>
                </div>)
            }
            {
                emailSent
                ?(<button
                 className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
                 type='submit'>
                    Resend Email
                </button>)
                :(<button
                 className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
                 type="submit" >
                    Submit
                </button>)
            }
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

export default ForgotPassword
