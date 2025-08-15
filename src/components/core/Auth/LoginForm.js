import React from 'react'
import {useState} from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; 
import { useDispatch } from 'react-redux';
import { login } from '../../../services/operations/authApis';


const LoginForm = () => {

    const navigate = useNavigate();
    const [showPassword,setPassword] = useState(false);
    const [formData,setFormData] = useState({email:"" , password:""});
    const dispatch = useDispatch();
    
    function changeHandler(e){
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
          }))
    }

    const {email,password} = formData;

    function handleOnSubmit(event){
        event.preventDefault();
        dispatch(login(email,password,navigate));
    }

  return (
    <div>
        
        <form onSubmit={handleOnSubmit}
         className="flex flex-col w-full gap-y-4 mt-6">

            <label className="w-full">
                <p className="text-[0.875rem] leading-[1.375rem] mb-4 text-white opacity-60">Email Address<sup className="text-red-600">*</sup></p>
                <input
                className="bg-[#161d29] rounded-[0.5rem] text-white w-full p-[12px] border-b-[0.05rem] border-[#e6e9db]"
                type="email" 
                required
                onChange={changeHandler}
                name="email"
                value={formData.email}
                placeholder="Enter email address"
                ></input>
            </label>

            <label className="w-full relative">
                <p className="text-[0.875rem] leading-[1.375rem] mb-4 text-white opacity-60">Password<sup className="text-red-600">*</sup></p>
                <input
                className="bg-[#161d29] rounded-[0.5rem] text-white w-full p-[12px] border-b-[0.05rem] border-[#e6e9db]"
                type={showPassword?"text":"password"} 
                required
                onChange={changeHandler}
                name="password"
                value={formData.password}
                placeholder="Enter password"
                ></input>
                <span
                 className="absolute right-3 top-[49px] cursor-pointer"
                 onClick={()=>{
                    setPassword(!showPassword);
                }}>
                    {
                        showPassword?

                        <AiOutlineEyeInvisible fontSize={24} fill='#afb2bf'/>

                        :<AiOutlineEye fontSize={24} fill='#afb2bf'/>
                    }
                </span>
            </label>

            <div>
                <Link to='/forgot-password'>
                    <p className="text-xs cursor-pointer -mt-3 max-w-max text-blue-300 ml-auto ">forgot password</p>
                </Link>
            </div>

            <button type="submit"
             className="bg-yellow-400 rounded-[8px] mt-7 font-medium text-[#000814] px-[12px] py-[8px] w-full">Sign In</button>


        </form>

    </div>
  )
}

export default LoginForm;
