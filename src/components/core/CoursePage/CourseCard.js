import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { addToCart } from '../../../slices/cartSlice';
import { FaCaretRight } from "react-icons/fa";
import { FaShareFromSquare  } from "react-icons/fa6";
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';

const CourseCard = ({ courseData, handleBuyCourse }) => {

    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();
   
    function handleCopy(){
        copy(window.location.href);
        toast.success("address copied to clipboard");
    }

    return (
        <div className="bg-richblack-700 p-4 w-11/12 rounded-lg flex flex-col gap-2">
            <img className="rounded-lg" src={courseData.thumbnail}></img>
            <div className="px-4 flex flex-col gap-4">
                <p className="text-richblack-5 text-3xl font-semibold">Rs. {courseData?.price}</p>
                <div>
                    {
                        courseData.studentsEnrolled.includes(user._id) ?
                         (<button className="w-full text-richblack-900 bg-yellow-50 py-2 px-3 rounded-md font-semibold" onClick={()=>{navigate("/dashboard/enrolled-courses")}}>Go To Course</button>) : 
                         (<button className="w-full text-richblack-900 bg-yellow-50 py-2 px-3 rounded-md font-semibold" onClick={handleBuyCourse}>Buy Now</button>)
                    }
                </div>
                <button
                 onClick={()=>{dispatch(addToCart(courseData))}}
                 className="w-full text-richblack-5 bg-richblack-800 py-2 px-3 rounded-md font-semibold">
                    Add to Cart
                </button>
                <p className="text-richblack-25 text-[14px] font-semibold text-center ">30-Day Money-Back Guarantee</p>
                <p className="text-richblack-5 text-[19px] font-bold">This Course Includes : </p>
                <div>
                    {
                        courseData.instructions.map((instruct,index)=>(
                            <p key={index} className="text-caribbeangreen-200 flex gap-2 items-center font-semibold"><FaCaretRight/> {instruct}</p>
                        ))
                    }
                </div>
                <button onClick={handleCopy} className="flex mb-4 items-center gap-1 text-yellow-50 justify-center"><FaShareFromSquare /> Share</button>
            </div>
        </div>
    )
}

export default CourseCard
