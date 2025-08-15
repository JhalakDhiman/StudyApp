import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../../../../slices/courseSlice';
import IconBtn from '../../../../common/IconBtn'
import { COURSE_STATUS } from '../../../../../utils/constants';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsApis';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CoursePublish = () => {

  const { register, setValue, getValues, handleSubmit, formState: { errors } } = useForm();
  const { course } = useSelector((state) => state.course);
  const {token} = useSelector((state)=>state.auth);
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false);

  const goToCourses = ()=>{
    dispatch(setStep(1));
    navigate('/dashboard/my-courses');

  }

  useEffect(() => {
    if(course.status === COURSE_STATUS.PUBLISHED){
      setValue("publish",true);
    }
  }, [])

  const submitHandler = async () => {
    if ((course.status === COURSE_STATUS.PUBLISHED && getValues("publish") === true)
      || (course.status === COURSE_STATUS.DRAFT && getValues("publish") === false)) {
        goToCourses();
        return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("courseId",course._id);
    const courseStatus = getValues("publish")?COURSE_STATUS.PUBLISHED:COURSE_STATUS.DRAFT;
    formData.append("status",courseStatus);
    const result = await editCourseDetails(formData,token);
    if(result){
      goToCourses();
    }
    setLoading(false);
  }

  const dispatch = useDispatch();

  return (
    <div className="bg-richblack-800 rounded-md p-5 flex flex-col gap-3">
      <h1 className="text-[19px] text-richblack-5 font-bold">Publish Settings</h1>
      <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-3">

        <div className="flex gap-2 items-center">
          <input type="checkbox"
            name="publish"
            className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            {...register("publish")}
          />
          <span className="text-richblack-25 font-semibold text-[16px]">Make this course as public</span>
        </div>

        <div className="flex gap-3 self-end mt-12">
          <IconBtn
            onclick={() => { dispatch(setStep(2)) }}
            textcolor={"richblack-900"}
            bgcolor={"richblack-600"}
            disabled={false}>
            Back
          </IconBtn>
          <button className="bg-yellow-50 p-2 px-4 rounded-md font-semibold text-richblack-900 " type="submit">
            Save Changes
          </button>
        </div>

      </form>
    </div>
  )
}

export default CoursePublish
