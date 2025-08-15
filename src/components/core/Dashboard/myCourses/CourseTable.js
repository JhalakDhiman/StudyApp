import React, { useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { formattedDate } from '../../../../utils/dateFormatter';
import { FaCheckCircle } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import {COURSE_STATUS} from '../../../../utils/constants'
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsApis';
import { useSelector } from 'react-redux';
import ConfirmationModal from '../../../common/ConfirmationModal'
import { useNavigate } from 'react-router-dom';

const CourseTable = ({ courses, setCourses }) => {

    const TRUNCATE_LENGTH = 30
    const [confirmationalModal,setConfirmationalModal] = useState(null);
    const {token} = useSelector((state)=>state.auth);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async(courseId)=>{
        setLoading(true);
        await deleteCourse(courseId,token);
        const result = await fetchInstructorCourses(token);
        if(result){
            setCourses(result);
        }
        setConfirmationalModal(null);
        setLoading(false);
    }

    return (
        <div>
            <Table className="rounded-xl border border-richblack-800 ">

                <Thead>
                    <Tr className="flex gap-x-8 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
                        <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                            COURSES
                        </Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                            DURATION
                        </Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                            PRICE
                        </Th>
                        <Th className="text-right text-sm font-medium uppercase text-richblack-100">
                            ACTIONS
                        </Th>
                    </Tr>
                </Thead>

                <Tbody>
                    {
                        courses.map((course) => (
                            <Tr key={course._id}
                                className="flex gap-x-10 border-b border-richblack-800 px-6 py-8">
                                <Td>
                                    <div className="flex gap-2">
                                        <div>
                                            <img src={course.thumbnail}
                                                className="h-[148px] w-[220px] rounded-lg object-cover"></img>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <p className="text-richblack-25 text-[17px] font-semibold">{course.courseName}</p>
                                            <p className="text-richblack-300 text-xs font-semibold">
                                                {course.courseDescription.split(" ").length >
                                                    TRUNCATE_LENGTH
                                                    ? course.courseDescription
                                                        .split(" ")
                                                        .slice(0, TRUNCATE_LENGTH)
                                                        .join(" ") + "..."
                                                    : course.courseDescription}
                                            </p>
                                            <p className="text-[12px] text-white">Created : {formattedDate(course.createdAt)}</p>
                                            <div className={`flex items-center gap-2 bg-richblack-800 rounded-full px-2 py-1 ${course.status === COURSE_STATUS.DRAFT ? "text-pink-300" : "text-caribbeangreen-500"}`}>
                                                <FaCheckCircle />
                                                <p className="font-semibold text-[14px]">{course.status}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Td>
                                <Td className="text-richblack-50">
                                    <p>2hr 30min</p>
                                </Td>
                                <Td className="text-richblack-50">
                                    {course.price}
                                </Td>
                                <Td>
                                    <div className="flex gap-3 text-richblack-50">
                                        <div
                                        onClick={()=>{navigate(`/dashboard/edit-course/${course._id}`)}}>
                                            <MdModeEditOutline />
                                        </div>
                                        <div className="cursor-pointer" onClick={
                                            ()=>{
                                                setConfirmationalModal({
                                                    text1:"Do you want to delete this course",
                                                    text2:"All sections will be deleted",
                                                    btn1Text:"Delete",
                                                    btn2Text:"Cancel",
                                                    btn1Handler:()=>{handleDelete({courseId:course._id})},
                                                    btn2Handler:()=>{setConfirmationalModal(null)}
                                                })
                                            }
                                        }>
                                            <RiDeleteBin6Line />
                                        </div>
                                    </div>
                                </Td>
                            </Tr>
                        ))
                    }
                </Tbody>

            </Table>
            {
                confirmationalModal && <ConfirmationModal modalData={confirmationalModal} setModalData={setConfirmationalModal}/>
            }
        </div>
    )
}

export default CourseTable
