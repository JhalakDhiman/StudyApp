import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input'
import { Link, useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../services/operations/authApis';
import Spinner from '../components/common/Spinner';

const VerifyEmail = () => {

    const [otp,setOtp] = useState();
    const dispatch = useDispatch();
    const {signupData} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const {loading} = useSelector((state)=>state.auth);

    useEffect(()=>{
        if(!signupData){
            navigate('/signup');
        }
    },[])

    function handleOnSubmit(event){
        event.preventDefault();
        const {
            email,
            password,
            confirmPassword,
            firstName,
            lastName,
            accountType
        } = signupData;
        
        dispatch(
            signup(email,password,confirmPassword,firstName,lastName,accountType,otp,navigate)
        )
    }

  return (
    <div className="w-[100vw] h-[90vh] flex justify-center items-center">
      {
        loading
        ?(<div>
            <Spinner/>
        </div>)
        :(
            <div className="flex flex-col gap-3 w-4/12">
                <h1 className="text-richblack-5 text-3xl font-semibold">Verify Email</h1>
                <p className="text-richblack-100 text-[18px] font-semibold">A verification code has been sent to you. Enter the code below</p>
                <form onSubmit={handleOnSubmit}>
                    <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => 
                        <input {...props}
                        placeholder="-"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                        className="w-[48px] m-1 lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                      />}
                    />
                    <button type="submit"
                    className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900">
                       Verify Email
                    </button>
                </form>
                <div className="mt-4    flex justify-between">
                    <Link to='/signup'>
                        <div className="flex gap-2 items-center">
                            <IoMdArrowRoundBack className="text-richblack-5"/>
                            <p className="text-richblack-5">Back to Signup</p>
                        </div>
                    </Link>
                    <button className="flex items-center gap-2">
                        <RxCountdownTimer className="text-blue-100 text-[20px]"/>
                        <p className="text-blue-100 text-semibold">Resend it</p>
                    </button>
                </div>
            </div>
        )
      }
    </div>
  )
}

export default VerifyEmail
