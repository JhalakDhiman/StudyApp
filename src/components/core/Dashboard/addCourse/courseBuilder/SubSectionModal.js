import React from 'react'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsApis';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { RxCross2 } from "react-icons/rx";
import Upload from '../courseInformation/Upload';

const SubSectionModal = ({
    modalData,
    setModalData,
    view = false,
    edit = false,
    add = false
}) => {


    const {
        register, setValue, getValues, handleSubmit, formState: { errors }
    } = useForm();
    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);
    const dispatch = useDispatch();

    useEffect(() => {
        if (view || edit) {
            setValue("lectureTitle", modalData.title);
            setValue("lectureVideo", modalData.videoUrl);
            setValue("lectureDesc", modalData.description);
        }
    }, [])

    const isFormUpdated = () => {
        const currentValues = getValues();

        if (currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureVideo !== modalData.videoUrl ||
            currentValues.lectureDesc !== modalData.description) {
            return true;
        }
        else {
            return false;
        }
    }

    const editSubSectionHandler = async () => {
        const formData = new FormData();
        const currentValues = getValues();
        formData.append("sectionId", modalData.sectionId);
        formData.append("subSectionId", modalData._id);

        if (currentValues.lectureTitle !== modalData.title) {
            formData.append("title", currentValues.lectureTitle);
        }
        if (currentValues.lectureVideo !== modalData.videoUrl) {
            formData.append("video", currentValues.lectureVideo);
        }
        if (currentValues.lectureDesc !== modalData.description) {
            formData.append("description", currentValues.lectureDesc);
        }
        setLoading(true);
        const result = await updateSubSection(formData, token);
        if (result) {
            // console.log("result", result)
            // update the structure of course
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === modalData.sectionId ? result : section
            )
            const updatedCourse = { ...course, courseContent: updatedCourseContent }
            dispatch(setCourse(updatedCourse))
        }
        setModalData(null);
        setLoading(false);
    }

    const submitHandler = async (data) => {
        if (view) {
            return;
        }
        if (edit) {
            if (isFormUpdated()) {
                editSubSectionHandler();
                return;
            }
            else {
                toast.error("no changes made to form");
            }

        }

        const formData = new FormData();
        formData.append("sectionId", modalData);
        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureDesc);
        formData.append("video", data.lectureVideo);

        setLoading(true);

        const result = await createSubSection(formData, token);
        if (result) {
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === modalData ? result : section
            )
            const updatedCourse = { ...course, courseContent: updatedCourseContent }
            dispatch(setCourse(updatedCourse))
        }
        setModalData(null);
        setLoading(false);

    }

    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="bg-richblack-800 mt-12 w-[40vw] rounded-md border-[1px] border-richblack-600 ">
                <div className="flex justify-between items-center bg-richblack-700 px-3 py-2">
                    <p className="text-richblack-25 text-[18px] font-semibold">{view && `Viewing`} {edit && "Editing"} {add && "Adding"} lecture</p>
                    <button onClick={() => { setModalData(null) }} className="text-richblack-50 ">
                        <RxCross2 />
                    </button>
                </div>
                <form className="p-5 flex flex-col gap-5" onSubmit={handleSubmit(submitHandler)}>

                    <div>
                        <Upload
                            name="lectureVideo"
                            label="Lecture Video"
                            register={register}
                            setValue={setValue}
                            errors={errors}
                            video={true}
                            viewData={view ? modalData.videoUrl : null}
                            editData={edit ? modalData.videoUrl : null}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-richblack-5" htmlFor='lectureTitle'>Lecture Title</label>
                        <input type="text"
                            placeholder="enter lecture title"
                            {...register("lectureTitle", { required: true })}
                            name="lectureTitle"
                            className="form-style"
                            disabled={view || loading}
                        />
                        {
                            errors.lectureTitle && <span>
                                lecture title is required
                            </span>
                        }
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-richblack-5" htmlFor='lectureDesc'>Lecture Description</label>
                        <textarea
                            placeholder="enter lecture description"
                            {...register("lectureDesc", { required: true })}
                            name="lectureDesc"
                            className="form-style"
                            disabled={view || loading}
                            rows={7}
                            cols={7}
                        />
                        {
                            errors.lectureDesc && <span>
                                lecture description is required
                            </span>
                        }
                    </div>

                    {
                        !view &&
                        <button
                            type="submit"
                            className="bg-yellow-50 text-richblack-900 font-semibold px-3 py-2 self-end w-fit rounded-md ">
                            {
                                loading ? "loading" : edit ? "Save Changes" : "Save"
                            }
                        </button>
                    }
                </form>
            </div>
        </div>
    )
}

export default SubSectionModal
