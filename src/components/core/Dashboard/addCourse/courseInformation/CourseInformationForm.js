import React from 'react'
import { useForm } from 'react-hook-form'
import { useState ,useEffect} from 'react';
import {toast} from 'react-hot-toast';
import { apiConnector } from '../../../../../services/apiConnector';
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { categories } from '../../../../../services/apis'
import TagInput from './TagInput';
import { useDispatch, useSelector } from 'react-redux';
import Upload from './Upload'
import RequirementsField from './RequirementsField';
import { editCourseDetails,addCourseDetails } from '../../../../../services/operations/courseDetailsApis';
import {setStep,setCourse} from '../../../../../slices/courseSlice'
import { COURSE_STATUS } from "../../../../../utils/constants" 
import IconBtn from '../../../../common/IconBtn'
const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors}
    } = useForm();

    const[loading,setLoading] = useState(false);
    const [courseCategories,setCourseCategories] = useState([]);
    const {course,editCourse} = useSelector((state)=>state.course);
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    const getCategories = async()=>{
        setLoading(true);
        try{
            const result = await apiConnector('GET',categories.CATEGORIES_API);
            const ans = result.data.data;
            setCourseCategories(ans);
        }catch(error){
            toast.error("error has occurred in fetching categories");
        }
        setLoading(false);
    }


    useEffect(()=>{

        getCategories();

        if(editCourse){
            setValue("courseTitle",course.courseName)
            setValue("courseShortDesc",course.courseDescription)
            setValue("coursePrice",course.price)
            setValue("courseTags",course.tag)
            setValue("courseImage",course.thumbnail)
            setValue("courseBenefits",course.whatYouWillLearn)
            setValue("courseRequirements",course.instructions)
            setValue("courseCategory",course.category)
        }
    },[])

    const isFormUpdated = ()=>{
        const currentValues = getValues();

        if( currentValues.courseTitle!==course.courseName || 
            currentValues.courseShortDesc!==course.courseDescription ||
            currentValues.coursePrice!==course.price ||
            currentValues.courseTags!==course.tag ||
            currentValues.courseImage!==course.thumbnail ||
            currentValues.courseBenefits!==course.whatYouWillLearn ||
            currentValues.courseRequirements.toString()!==course.instructions.toString() ||
            currentValues.courseCategory!==course.category ){
                return true;
            }
            else{
                return false;
            }
    }

    const handleOnSubmit = async(data)=>{
        if(editCourse){
            if(isFormUpdated()){
                const currentValues = getValues();
                const formData = new FormData();
                if(currentValues.courseTitle!==course.courseName){
                    formData.append("courseName",data.courseTitle);
                }
                if(currentValues.courseShortDesc!==course.courseDescription){
                    formData.append("courseDescription",data.courseShortDesc);
                }
                if(currentValues.coursePrice!==course.price){
                    formData.append("price",data.coursePrice);
                }
                if(currentValues.courseTags.toString()!==course.tag.toString()){
                    formData.append("tag",JSON.stringify(data.courseTags));
                }
                if(currentValues.courseImage!==course.thumbnail){
                    formData.append("thumbnail",data.courseImage);
                }
                if(currentValues.courseBenefits!==course.whatYouWillLearn){
                    formData.append("whatYouWillLearn",data.courseBenefits);
                }
                if(currentValues.courseRequirements.toString()!==course.instructions.toString()){
                    formData.append("instructions",JSON.stringify(data.courseRequirements));
                }
                if(currentValues.courseCategory._id!==course.category._id){
                    formData.append("category",data.courseCategory);
                }

                setLoading(true);
                const result = await editCourseDetails(formData,token);
                setLoading(false);
                if(result){
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                }
            }
            else{
                toast.error("no changes have been made to the form");
            }
            return;
        }
        else{
            const formData = new FormData()
            formData.append("courseName", data.courseTitle)
            formData.append("courseDescription", data.courseShortDesc)
            formData.append("price", data.coursePrice)
            formData.append("tag", JSON.stringify(data.courseTags))
            formData.append("whatYouWillLearn", data.courseBenefits)
            formData.append("category", data.courseCategory)
            formData.append("status", COURSE_STATUS.DRAFT)
            formData.append("instructions", JSON.stringify(data.courseRequirements))
            formData.append("thumbnailImage", data.courseImage)
            setLoading(true)
            const result = await addCourseDetails(formData, token)
            if (result) {
            dispatch(setStep(2))
            dispatch(setCourse(result))
            }
            setLoading(false)

        }
    } 


  return (
    <div className="bg-richblack-800 w-full mt-12 p-5 rounded-md">
      <form onSubmit={handleSubmit(handleOnSubmit)} className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
            <label htmlFor='courseTitle' className="text-sm text-richblack-5">Course Title <sup className="text-pink-200">*</sup></label>
            <input className="form-style" type="text"
                name="courseTitle"
                placeholder="enter your course title"
                {...register("courseTitle",{required:true})}
                ></input>
                {
                    errors.courseTitle&&<span>
                        Enter the course title
                    </span>
                }
        </div>

        <div className="flex flex-col gap-3">
            <label htmlFor='courseShortDesc' className="text-sm text-richblack-5">Course Short Description <sup className="text-pink-200">*</sup></label>
            <input className="form-style" type="text"
                name="courseShortDesc"
                placeholder="enter your course description"
                {...register("courseShortDesc",{required:true})}
                ></input>
                {
                    errors.courseShortDesc&&<span>
                        Enter the course description
                    </span>
                }
        </div>

        <div className="flex flex-col gap-3">
            <label htmlFor='coursePrice' className="text-sm text-richblack-5">Course Price <sup className="text-pink-200">*</sup></label>
            <div className="relative">
                <HiOutlineCurrencyRupee className="text-richblack-300 text-[25px] top-3 left-1 absolute"/>
                <input className="form-style w-full" type="number"
                    name="coursePrice"
                    placeholder="     enter price"
                    {...register("coursePrice",{required:true})}
                    ></input>
            </div>
                {
                    errors.coursePrice&&<span>
                        Enter the course description
                    </span>
                }
        </div>

        <div className="flex flex-col gap-3">
            <label htmlFor="courseCategory" className="text-sm text-richblack-5">Course Category<sup className="text-pink-200">*</sup></label>
            <select
                className="form-style"
                type="text"
                {...register("courseCategory",{required:true})}
                name="courseCategory"
                >
                 {
                    !loading&& 
                    courseCategories.map((category)=>(
                        <option key={category._id} value={category?._id}>{category.name}</option>
                    ))

                }

            </select>
        </div>

        <div>
            <TagInput
                register={register}
                label="Tags"
                name="courseTags"
                placeholder="Enter tags and press enter"
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />
        </div>

        <div>
            <Upload
            name="courseImage"
            label="Course Thumbnail"
            register={register}
            setValue={setValue}
            errors={errors}
            editData={editCourse?course.thumbnail:null}
            ></Upload>
        </div>

        <div className="flex flex-col gap-3">
            <label htmlFor='courseBenefits' className="text-sm text-richblack-5">Benefits of the course <sup className="text-pink-200">*</sup></label>
            <input className="form-style" type="text"
                name="courseBenefits"
                placeholder="enter course benefits"
                {...register("courseBenefits",{required:true})}
                 ></input>
                {
                    errors.courseBenefits&&<span>
                        Enter the course benefits
                    </span>
                }
        </div>

        <RequirementsField
            name="courseRequirements"
            label="Requirements/Instructions"
            register={register}
            setValue={setValue}
            errors={errors}
            getValues={getValues}
        />

        <div className='flex gap-2'>

                 {
                    editCourse &&
                    <IconBtn
                        onclick={()=>{dispatch(setStep(2))}}
                        disabled={loading}
                        bgcolor={"richblack-600"}
                        textcolor={"richblack-25"}
                    >
                        Continue without saving 
                        </IconBtn>
                 }

                <IconBtn
                disabled={loading}
                bgcolor={"yellow-50"}
                textcolor={"richblack-900"}
                >
                    {
                        editCourse?(<p>Save Changes</p>):(<p>Next</p>)
                    }
                </IconBtn>

        </div>

      </form>
    </div>
  )
}

export default CourseInformationForm
