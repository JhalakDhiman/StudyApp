import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn'
import { useDispatch } from 'react-redux'
import { IoIosAddCircleOutline } from "react-icons/io";
import { useSelector } from 'react-redux';
import NestedView from './NestedView';
import { setCourse, setStep } from '../../../../../slices/courseSlice';
import { FaChevronRight } from "react-icons/fa6";
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsApis';

const CourseBuilderForm = () => {


  const {register,setValue,handleSubmit,formState:{errors}} = useForm();
  const dispatch = useDispatch();
  const [editSectionName,setEditSectionName] = useState(null); 
  const [loading,setLoading] = useState(false); 
  const {course} = useSelector((state)=>state.course);
  const {token} = useSelector((state)=>state.auth);

  const cancelEdit = () =>{
    setEditSectionName(null);
    setValue("sectionName","");
  }

  const goBack = ()=>{
    dispatch(setStep(1));
    setValue("sectionName","");
  }

  const goToNext = () =>{
    if(course.courseContent.length===0){
      toast.error("please create at least one section");
      return;
    }
    if(course.courseContent.some((section)=>section.length===0)){
      toast.error("please create atleast one subsection");
      return;
    }
    dispatch(setStep(3));

  }

  const handleChangeEditSectionName = (sectionId,sectionName) =>{
    if(editSectionName){
      cancelEdit();
    }
    setEditSectionName(sectionId);
    setValue("sectionName",sectionName);
  }

  const handleOnSubmit = async(data) =>{
    setLoading(true);
    let result;
    if(editSectionName){
      result = await updateSection({
        sectionName:data.sectionName,
        sectionId:editSectionName,
        courseId:course._id,
      },token); 
    }
    else{
      result = await createSection({
        sectionName:data.sectionName,
        courseId:course._id,
      },token);
    }
    if(result){
      dispatch(setCourse(result));
      setEditSectionName(false);
      setValue("sectionName","");
    }
    setLoading(false);
  }

  return (
    <div className='bg-richblack-800 rounded-md py-6 px-4 flex flex-col gap-6'>

        <div>
          <h1 className="text-richblack-25 text-2xl font-bold">Course Builder</h1>
        </div>

        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <div className="flex flex-col gap-2">
            <label htmlFor='sectionName' className="text-sm text-richblack-5">Section Name <sup className="text-pink-200">*</sup></label>
            <input 
              type="text"
              {...register("sectionName",{required:true})}
              className="form-style"
              placeholder="enter section name"
              ></input>
              {
                errors.sectionName && (
                  <span>
                    section name is required
                  </span>
                )
              }
          </div>
          <div className="flex gap-8 items-center">

            <button type="submit" className="py-2 mt-6 px-3 bg-richblack-700 text-yellow-100 font-semibold border-[2px] border-yellow-100 rounded-md">
              <div className="flex items-center gap-2">
                  {
                    editSectionName?("Edit Section Name"):("Create Section")
                  }
                  <IoIosAddCircleOutline className="text-yellow-50"/>
                </div>
            </button>

            <div>
            {
              editSectionName &&
              (<button onClick={cancelEdit} className="text-richblack-200 mt-4 font-semibold underline h-fit">
                cancel edit
              </button>)
            }
            </div>

          </div>

        </form>

        {
          course.courseContent.length>0 && 
          <div>
            <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
          </div>
        }

        <div className="flex flex-row-reverse gap-3">

          <IconBtn 
          textcolor={"richblack-900"}
          bgcolor={"yellow-50"}
          onclick={goToNext}
          disabled={false}
          > 
          <div className="flex gap-2 items-center">
              <p>Next</p>
              <FaChevronRight/>
          </div>
          </IconBtn>

          <IconBtn 
          textcolor={"richblack-900"}
          bgcolor={"richblack-600"}
          onclick={goBack}
          disabled={false}
          >
            Back
          </IconBtn>

        </div>

    </div>
  )
}

export default CourseBuilderForm
