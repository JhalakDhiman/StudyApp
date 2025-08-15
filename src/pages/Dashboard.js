import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/core/Dashboard/Sidebar'
import { useSelector } from 'react-redux';
import Spinner from '../components/common/Spinner';

const Dashboard = () => {

  const {loading:authLoading} = useSelector((state)=>state.auth);
  const {loading:profileLoading} = useSelector((state)=>state.profile);

  if(authLoading || profileLoading){
    return (
      <Spinner/>
    )
  }

  return (
    <div className="relative flex w-[100vw] justify-between ">
    <Sidebar />
    <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
      <div className="mx-auto w-11/12 max-w-[1000px] py-10">
        <Outlet />
      </div>
    </div>
  </div>
  )
}

export default Dashboard
