import {toast} from "react-hot-toast"
import { setLoading, setToken } from "../../slices/authSlice"
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import { setUser } from "../../slices/profileSlice";

export const sendOtp = (email,navigate)=>{
    return async (dispatch)=> {
        const toastId = toast.loading("loading....");
        dispatch(setLoading(true));

        try{
            const response = await apiConnector("POST",endpoints.SENDOTP_API,{
                email,
                checkUserPresent: true,
            });
            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success(response.data.message);
            navigate("/verify-email")
        } catch(error){
            console.log("Error occurred : ",error);
            toast.error("Could not send OTP");
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

export const signup = (email,password,confirmPassword,firstName,lastName,accountType,otp,navigate)=>{
    return async(dispatch)=>{
        const toastId = toast.loading("loading...");
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST",endpoints.SIGNUP_API,{
                email,password,confirmPassword,firstName,lastName,accountType,otp
            });
            if(!response.data.success){
                toast.error(response.data.message);
                throw new Error(response.data.message);
            }
            toast.success(response.data.message);
            navigate("/login");

        } catch(error){
            console.log("Error occured during signup : ",error);
            toast.error("unable to signup");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const login =(email,password,navigate)=>{
    return async(dispatch)=>{
        const toastId = toast.loading("loading...");
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST",endpoints.LOGIN_API,{
                email,password
            });
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success(response.data.message);
            dispatch(setToken(response.data.token));
            const userImage = response.data?.user?.image
            ? response.data.user.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            dispatch(setUser({...response.data.user,image:userImage}));
            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user",JSON.stringify(response.data.user))
            navigate("/dashboard/my-profile");
        } catch (error){
            console.log("error occurred during login : ",error);
            toast.error("unable to login");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const resetPasswordToken = (email,setEmailSent)=>{
    return async(dispatch)=>{
        const toastId = toast.loading("loading...");
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST",endpoints.RESETPASSTOKEN_API,{
                email
            });
            if(!response.data.success){
                toast.error(response.data.message);
                throw new Error(response.data.message);
            }
            toast.success(response.data.message);
            setEmailSent(true);
        } catch(error){
            console.log("error occurred during sending reset mail: ",error);
            toast.error("could not send reset mail");
        } 
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const resetPassword = (password,confirmPassword,token)=>{
    return async(dispatch)=>{
        const toastId = toast.loading("loading...");
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST",endpoints.RESETPASSWORD_API,{
                password,confirmPassword,token
            })
            if(!response.data.success){
                toast.error(response.data.message);
                throw new Error(response.data.message);
            }
            toast.success(response.data.message);
            
        } catch(error){
            console.log("error occurred during reset password : ",error);
            toast.error("could not reset password");
        }   
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const logout =(navigate)=>{
    return async(dispatch)=>{
        dispatch(setUser(null));
        dispatch(setToken(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("logged out");
        navigate("/");
    }
}