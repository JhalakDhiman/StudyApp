import { paymentEndpoints } from '../apis';
import {apiConnector} from '../apiConnector'
import {toast} from "react-hot-toast";
import rzpLogo from '../../assets/Logos/rzp_logo.png'
import { setPaymentLoading } from '../../slices/courseSlice';
import {resetCart} from '../../slices/cartSlice'

const {
    COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = paymentEndpoints

function loadScript(src){
    return new Promise((resolve)=>{
        const script = document.createElement("script");
        script.src = src;
        script.onload = () =>{
            resolve(true)
        }
        script.onerror = () =>{
           resolve(false) 
        }
        document.body.appendChild(script);  
    })
}

export async function buyCourse(
    token,courses,user_details,navigate,dispatch
){
    const toastId = toast.loading("loading...");
    try{
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if(!res){
            toast.error("Razorpay sdk failed to load. please check your internet connection");
            return;
        }

        const orderResponse = await apiConnector(
            "POST",
            COURSE_PAYMENT_API,
            {
                courses,
            },
            {
                Authorization:`Bearer ${token}`
            }
        )

        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
        }

        console.log("PAYMENT RESPONSE FROM BACKEND : ",orderResponse.data);

        const options = {
            key:process.env.RAZORPAY_KEY,
            currency:orderResponse.data.data.currency,
            amount:`${orderResponse.data.data.amount}`,
            order_id:orderResponse.data.data.id,
            name:"Codeplay",
            description:"Thank you for purchasing the course",
            image:rzpLogo,
            prefill:{
                name:`${user_details.firstName} ${user_details.lastName}`,
                email:user_details.email,
            },
            handler:function(response){
                sendPaymentSuccessEmail(response,orderResponse.data.data.amount,token)
                verifyPayment({...response,courses},token,navigate,dispatch)
            },
        }
        const paymentObject = new window.Razorpay(options);

        paymentObject.open();
        paymentObject.on("payment.failed",function(response){
            toast.error("oops.payment failed!");
            console.lof(response.error);
        })

    } catch(error){
        console.log("PAYMENT API ERROR : ",error);
        toast.error("could not make payment");
    }
    toast.dismiss(toastId);
}

export async function verifyPayment(bodyData,token,navigate,dispatch){
    const toastId = toast.loading("verifying payment...");
    dispatch(setPaymentLoading(true));
    try{
        const response = await apiConnector(
            "POST",
            COURSE_VERIFY_API,
            bodyData,
            {
                Authorization:`Bearer ${token}`
            }
        )
        console.log("verify payment response : ",response );
        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success("payment Successfull. You are added to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    } catch(error){
        console.log("PAYMENT VERIFY ERROR............", error)
        toast.error("Could Not Verify Payment.")
    }
    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false))

}

async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        console.log("sending email");
      await apiConnector(
        "POST",
        SEND_PAYMENT_SUCCESS_EMAIL_API,
        {
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          amount,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      )
    } catch (error) {
      console.log("PAYMENT SUCCESS EMAIL ERROR............", error)
    }
  }