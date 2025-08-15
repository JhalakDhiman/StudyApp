import React,{useState,useEffect} from 'react'
import IconBtn from '../../common/IconBtn'
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsApis';
import { useSelector } from 'react-redux';
import CourseTable from './myCourses/CourseTable';

const MyCourses = () => {

    const navigate = useNavigate();

    const [courses,setCourses] = useState([]);
    const {token} = useSelector((state=>state.auth));
   
    const fetchAllCourses = async()=>{
        console.log("going to call");
        const result = await fetchInstructorCourses(token);
        if(result){
            setCourses(result);
        }
    }

    useEffect(()=>{
        console.log("let us make call for fteching")
        fetchAllCourses();
    },[])

  return (
    <div className="w-9/12 mx-auto">

        <div className="flex justify-between mb-6 items-center">
            <h1 className="text-[20px] font-semibold text-richblack-25">My Courses</h1>
            <IconBtn
             onclick={()=>{navigate('/dashboard/add-course')}}
             bgcolor={"yellow-50"}
             texcolor={"richblack-900"}>
                <div className="flex gap-2 items-center">
                    <p>Add Course</p>
                    <IoMdAdd/>
                </div>
            </IconBtn>
        </div>

        <div>
            {
                courses ? (<CourseTable courses={courses} setCourses={setCourses} />):(<div>No courses</div>)
            }
        </div>
      
    </div>
  )
}

export default MyCourses
