import React from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteAccount } from '../../../../services/operations/settingsApis';

const DeleteAccount = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {token} = useSelector((state)=>state.auth);
  const handleDeleteAccount = ()=>{
    try{
      dispatch(deleteAccount(token,navigate));
    } catch(error){

    }
  }

  return (
    <div className="bg-pink-900 pr-12 pl-5 py-5 rounded-md flex gap-3">
      <div className="w-[30%] flex justify-center cursor-pointer ">
        <div className="bg-pink-700  rounded-full w-[50px] h-[50px] flex items-center justify-center">
          <RiDeleteBin6Line className="text-[25px] text-pink-900 "/>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-richblack-50 font-semibold">Delete Account</h1>
        <p className="text-richblack-50">Would you like to delete account ? This account may contain Paid courses. Deleting your account  in permanent and will remove  all the contain associated with it.</p>
        <div>
          <button className="text-pink-500 font-bold" onClick={handleDeleteAccount}>
            I want to delete my account
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteAccount
