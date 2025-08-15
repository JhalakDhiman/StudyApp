import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { buyCourse } from '../../../../services/operations/studentFeaturesApis';
import { useNavigate } from 'react-router-dom';

const CartPrice = () => {

  const { total,cart } = useSelector((state) => state.cart);
  const {token} = useSelector((state)=>state.auth);
  const {user} = useSelector((state)=>state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleBuyCourse(){
    let courses = cart.map((course)=>course._id);
    buyCourse(token,courses,user,navigate,dispatch);
  }

  return (
    <div className="flex flex-col bg-richblack-800 px-5 rounded-md gap-2 max-h-[130px] pt-2 w-[250px]">
      <div>
        <p className="text-richblack-200 text-[13px]">Total</p>
        <p className="text-yellow-50 text-[21px]">₹ {total}</p>
      </div>
      <button 
      onClick={handleBuyCourse}
      className="bg-yellow-50 rounded-md text-richblack-900 py-2 w-full px-6 mb-3 font-semibold"> 
        Buy Now
      </button>
    </div>
  )
}

export default CartPrice
