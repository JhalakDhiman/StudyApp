import React from 'react'
import ReactStars from 'react-rating-stars-component'
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { removeFromCart } from '../../../../slices/cartSlice';
import { useDispatch } from 'react-redux';

const CartItem = ({course}) => {

    const dispatch = useDispatch();

  return (
    <div className="flex gap-4 border-b-[1px] border-richblack-600 mt-3">
      <div className=" mb-6">
        <img className="h-[118px] w-[220px] rounded-lg object-cover" src={course.thumbnail}></img>
      </div>
      <div className="w-[65%]">
        <p className="text-richblack-5 text-[17px] font-semibold  ">{course.courseName}</p>
        <p className="text-richblack-100 text-[13px]">{course.category.name}</p>
        <div className="flex items-center gap-2">
            <span className="text-yellow-50 font-semibold">4.5</span>
            <ReactStars
                count={5}
                value={course?.ratingAndReviews?.length}
                activeColor="#ffd700"
                size={20}
                edit={false}
                emptyIcon={<FaStar/>}
                fullIcon={<FaRegStar/>}
                />
            <span className="text-richblack-200 text-[14px]">{course?.ratingAndReviews?.length} rating</span>
        </div>
        <p>Total Courses * Lessons * Beginner</p>
      </div>
      <div className="w-[10%] flex flex-col gap-3 mr-12 items-center">
        <button
          className="bg-richblack-800 text-pink-500 font-semibold rounded-md py-2 px-3"
         onClick={()=>dispatch(removeFromCart(course._id))}>
            <div className="flex gap-2 items-center">
                <p>Remove</p>
                <RiDeleteBinLine/>
            </div>
        </button>
        <p className='text-yellow-50 text-[17px]'>₹{course.price}</p>
      </div>
    </div>
  )
}


export default CartItem
