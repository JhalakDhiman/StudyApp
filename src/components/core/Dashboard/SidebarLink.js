import React from 'react'
import { NavLink, matchPath, useLocation } from 'react-router-dom'
import * as Icons from 'react-icons/vsc'

const SidebarLink = ({link,iconName}) => {

    const location = useLocation();
    const Icon = Icons[iconName]

    const matchRoute = (route)=>{
        return matchPath({path:route},location.pathname);
    }

  return (
    <div className={`${matchRoute(link.path)?"bg-yellow-800 text-yellow-50":"bg-richblack-800 text-richblack-200"} p-2 gap-2`}>
        <NavLink to={link.path} className={`relative  `}
            >
            <span className={`absolute h-10 w-1 bg-yellow-50 -left-2 -top-2 ${matchRoute(link.path)?"opacity-100":"opacity-0"}`}></span>

            <div className="flex items-center gap-2 px-2">
                <Icon></Icon>
                <p>{link.name}</p>
            </div>
            
            </NavLink>
    </div>
  )
}

export default SidebarLink
