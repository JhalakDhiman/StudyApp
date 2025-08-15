import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../common/Spinner'
import SidebarLink from './SidebarLink'
import { IoLogOutOutline } from "react-icons/io5";
import {logout} from '../../../services/operations/authApis'
import { useNavigate } from 'react-router-dom'
import ConfirmationModal from '../../common/ConfirmationModal'

const Sidebar = () => {

  const {loading:authLoading} = useSelector((state)=>state.auth);
  const {loading:profileLoading} = useSelector((state)=>state.auth);
  const {user} = useSelector((state)=>state.profile);
  const [confirmationModal,setConfirmationModal] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  if(authLoading|| profileLoading){
    return (
      <Spinner></Spinner>
    )
  }

  return (
    <div className="bg-richblack-800 pt-8 w-fit relative ">

      <div>
          <div>
            {
              sidebarLinks.map((link,index)=>{
                if(link.type && link.type!==user.accountType) return null
                
                return (
                  <SidebarLink link={link} key={index} iconName={link.icon}></SidebarLink>
                )
            })
            }
          </div>

          <SidebarLink link={{name:"settings",path:"/dashboard/settings"}} iconName="VscSettingsGear"></SidebarLink>

          <button
          onClick={()=>{
            setConfirmationModal(
              {
                text1:"Are you sure ?",
                text2:"You will be logged out of your account",
                btn1Text:"Logout",
                btn2Text:"Cancel",
                btn1Handler:()=>dispatch(logout(navigate)),
                btn2Handler:()=>setConfirmationModal(null)
              }
            )
            }
          }
           className="p-2">
            <div className="flex items-center gap-2 text-richblack-200 px-2">
              <IoLogOutOutline className="text-[19px]"/>
              <p className="bg-richblack-800 text-richblack-200">logout</p>
            </div>
          </button>
      </div>
      <div>
        {
          confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
        }
      </div>

    </div>
  )
}

export default Sidebar
