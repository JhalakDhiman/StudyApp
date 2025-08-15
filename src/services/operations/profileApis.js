import {toast} from 'react-hot-toast'
import { apiConnector } from '../apiConnector';
import { profileEndpoints } from '../apis';
import { instructorEndpoints } from '../apis';

const {
    GET_USER_ENROLLED_COURSES 
} = profileEndpoints

export async function getUserEnrolledCourses(token) {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
      const response = await apiConnector(
        "GET",
        GET_USER_ENROLLED_COURSES,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )
   
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response?.data.data
    } catch (error) {
      console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
      toast.error("Could Not Get Enrolled Courses")
    }
    toast.dismiss(toastId)
    return result
  }

  export async function fetchInstrcutorData(token){
    const toastId = toast.loading("loading...");
    let result = [];
    try{
      const response = await apiConnector('GET',instructorEndpoints.INSTRUCTOR_DATA_API,null,
      {
        Authorization: `Bearer ${token}`,
      })
      console.log("GET_INSTRUCTOR_DATA_API API RESPONSE............", response);
      result = response?.data?.courses;
    } catch(error){
      console.log("GET_INSTRUCTOR_DATA_API API ERROR............", error);
      toast.error("could not get instructor data");
    }
    toast.dismiss(toastId);
    return result;
  }
  