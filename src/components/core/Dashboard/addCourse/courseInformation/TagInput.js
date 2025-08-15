import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx";

const TagInput = ({register,setValue,getValues,name,placeholder,label,errors}) => {

    const [tags,setTags] = useState([]);
    const {course,editCourse} = useSelector((state)=>state.course);

    useEffect(()=>{
        if(editCourse){
            setTags(course?.tags);
        }
        register(name,{required:true,validate:(value)=>value.length>0})
    },[])

    useEffect(()=>{
        setValue(name,tags);
    },[tags])

    function handleKeyDown(event){
        if(event.key==="Enter" || event.key===","){
            event.preventDefault();
            const tagValue = event.target.value.trim();
            if(tagValue && !tags.includes(tagValue)){
                const newTags = [...tags,tagValue];
                console.log(newTags);
                setTags(newTags);
                event.target.value=""
                console.log(tags);
            }
        }
    }

    function handleDeleteTag(tagIndex){
        const newTags = tags.filter((_,index)=>index!==tagIndex);
        setTags(newTags);
    }

  return (
    <div className="text-white">
      <div className="flex flex-col gap-1">
        <label htmlFor={name} className="text-sm text-richblack-5">{label} <sup className="text-pink-200">*</sup></label>


        <div className="flex gap-2 py-1  flex-wrap">
            {
                tags.map((tag,index)=>(
                    <div key={index} className="text-richblack-25 flex bg-yellow-500 gap-2 items-center p-2 py-1 rounded-full">
                        <p>{tag}</p>
                        <div onClick={()=>{handleDeleteTag(index)}}>
                            <RxCross2 className="text-richblack-25 text-[13px] font-bold"/>
                        </div>
                    </div>
                ))
            }
        </div>

        <input type="text"
                className="form-style w-full"
                name={name}
                placeholder={placeholder}
                onKeyDown={handleKeyDown}
        ></input>
      </div>
            {
                errors[name]&&<span>
                    {label} is required
                </span>
            }
    </div>
  )
}

export default TagInput
