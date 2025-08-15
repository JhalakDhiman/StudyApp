import { toast } from "react-hot-toast"

import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { settingsEndpoints } from "../apis"
import { logout } from "./authApis"
import { setToken } from "../../slices/authSlice"

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      )
      console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      )

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Display Picture Updated Successfully")
      dispatch(setUser(response.data.data))
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
      toast.error("Could Not Update Display Picture")
    }
    toast.dismiss(toastId)
  }
}


export function updateProfileDetails(token,data){
  return async(dispatch)=>{
    const toastId = toast.loading("loading...");
    try{
      const response = await apiConnector('PUT',UPDATE_PROFILE_API,data,
      {
        Authorization: `Bearer ${token}`,
      }
      );
      if(!response.data.success){
        throw new Error(response.data.message);
      }
      dispatch(setUser(response.data.updatedUserDetails));
      toast.success(response.data.message);
    } catch(error){
      toast.error(error);
    }
    toast.dismiss(toastId);
  }
}

export function deleteAccount(token,navigate){
  return async(dispatch)=>{
    const toastId = toast.loading("loading...");
    try{
      const response = await apiConnector('POST',DELETE_PROFILE_API,null,
      {
        Authorization: `Bearer ${token}`,
      }
      );
      if(!response.data.success){
        throw new Error(response.data.message);
      } 
      dispatch(setUser(null));
      dispatch(setToken(null));
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      toast.success(response.data.message);
      navigate('/');
    } catch(error){
        console.log("Delete profile error : ",error);
        toast.error(error);
    }
    toast.dismiss(toastId);
  }
}