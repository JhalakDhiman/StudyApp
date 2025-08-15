import React from 'react'
import { useSelector } from 'react-redux'
import CartPrice from './CartPrice'
import CartItem from './CartItem'

const Cart = () => {

    const {cart} = useSelector((state)=>state.cart);
    const {totalItems} = useSelector((state)=>state.cart);
    const {total} = useSelector((state)=>state.cart);

  return (
    <div className="w-9/12 mx-auto">
      <h1 className="text-richblack-5 font-semibold text-2xl mb-12">My Cart</h1>
      <div>
        <div className="border-b-[1px] border-richblack-600 pb-2 mb-5">
            <p className="text-richblack-400 font-semibold">{totalItems} Courses in Wishlist</p>
        </div>
        <div className="flex gap-2">
            <div className="w-[80%]">
                {
                    !cart.length ? (<div>Your cart is empty</div>)
                    :(
                        <div>
                            {
                                cart.map((course)=>(
                                    <CartItem course={course} key={course._id}/>
                                ))
                            }
                        </div>
                    )
                }
            </div>
            <CartPrice className="w-[20%]"/>
        </div>
      </div>
    </div>
  )
}

export default Cart
