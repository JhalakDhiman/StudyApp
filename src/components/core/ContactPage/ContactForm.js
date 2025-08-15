import React, { useEffect,useState } from 'react'
import { useForm } from 'react-hook-form'
import countrycode from  '../../../data/countrycode.json'
import { apiConnector } from '../../../services/apiConnector';

const ContactForm = () => {

    const [loading,setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState:{isSubmitSuccessful,errors}
    } = useForm();


    useEffect(()=>{
        reset({
            firstName:"",
            lastName:"",
            email:"",
            phoneNumber:"",
            message:"" 
        })
    },[reset,isSubmitSuccessful])

    const submitHandler = async(data)=>{
        try{
            setLoading(true);
            // const res = await apiConnector("POST",)
            console.log("form data : ",data);
        } catch(error){

        }
    }

  return (
    <div className="h-[90vh] w-full mt-7">

        <form className="flex flex-col lg:w-[37vw] mx-auto gap-5" onSubmit={handleSubmit(submitHandler)}>
            <div className="flex gap-3">
                <div className="flex flex-col gap-2 w-[50%]">
                    <label htmlFor="firstName"
                    className="text-richblack-5 font-semibold text-[14px]">First Name</label>
                    <input type="text"
                        name="firstName"
                        className="bg-richblack-700 p-2 py-3 rounded-md border-b-[1px] border-richblack-50"
                        placeholder="first name"
                        {...register("firstName",{required:true})}>
                    </input>
                    {
                        errors.firstName && (
                            <span>
                                enter your first name
                            </span>
                        )
                    }
                </div>
                <div className="flex flex-col gap-2 w-[50%]">
                    <label htmlFor="lastName"
                    className="text-richblack-5 font-semibold  text-[14px]">Last Name</label>
                    <input type="text"
                        name="lastName"
                        placeholder="last name"
                        className="bg-richblack-700 p-2 py-3 text-richblack-300 rounded-md border-b-[1px] border-richblack-50"
                        {...register("lastName")}>
                    </input>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor='email'
                className="text-richblack-5 font-semibold  text-[14px]">Email Address</label>
                <input type="text"
                    placeholder="enter your email"
                    className="bg-richblack-700 p-2 py-3 text-richblack-300 rounded-md border-b-[1px] border-richblack-50"
                    name="email"
                    {...register("email",{required:true})}
                ></input>
                {
                    errors.email && (
                        <span>
                            enter your email
                        </span>
                    )
                }
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor='phoneNumber'
                className="text-richblack-5 font-semibold  text-[14px]">Phone Number</label>
                <div className="flex gap-5">
                    <select type="text" 
                        name="countryCode"
                        className="w-[17%] rounded-md bg-richblack-700 text-richblack-100 border-b-[1px] border-richblack-50"
                        {...register("countryCode",{required:true})}>
                        {
                            countrycode.map((countrycode,index)=>(
                                <option key={index} value={countrycode.code}>
                                    {countrycode.code}-{countrycode.country}
                                </option>
                            ))
                        }
                    </select>
                    <input type="number" 
                        name="phoneNumber"
                        placeholder="12345 67890"
                        className="bg-richblack-700 p-2 py-3 w-[90%]  text-richblack-300 rounded-md border-b-[1px] border-richblack-50"
                        {...register("phoneNumber",{
                            required:{value:true,message:"please enter your phone number"},
                            maxLength:{value:12,message:"enter valid phone number"},
                            minLength:{value:10,message:"enter valid phone number"},
                        })}></input>

                        {
                            errors.phoneNumber&&(
                                <span>
                                    {errors.phoneNumber.message}
                                </span>
                            )
                        }
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor='message'
                className="text-richblack-5 font-semibold  text-[14px]">Message</label>
                <textarea
                    name="message"
                    cols="30"
                    rows="7"
                    className="bg-richblack-700 p-2 py-3 text-richblack-300 rounded-md border-b-[1px] border-richblack-50"
                    placeholder="enter your message here"
                    {...register("message",{required:true})}
                ></textarea>
                {
                    errors.message && (
                        <span>
                            please enter your message
                        </span>
                    )
                }
            </div>

            <button
            className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
            >Send Message</button>

        </form>
      
    </div>
  )
}

export default ContactForm
