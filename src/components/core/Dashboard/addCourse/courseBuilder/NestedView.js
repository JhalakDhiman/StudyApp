import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import { RxDropdownMenu } from "react-icons/rx";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaCaretDown } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import SubSectionModal from './SubSectionModal';
import ConfirmationModal from '../../../../common/ConfirmationModal'
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsApis';
import { setCourse } from '../../../../../slices/courseSlice';

const NestedView = ({ handleChangeEditSectionName }) => {

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [loading, setLoading] = useState(false);

  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleteSection = async (sectionId) => {
    const formData = new FormData();
    formData.append("sectionId", sectionId);
    formData.append("courseId", course._id);

    setLoading(true);
    const result = await deleteSection(formData, token);
    if (result) {
      dispatch(setCourse(result));
    }
    setLoading(false);
    setConfirmationModal(null);
  }

  const handleDeleteSubSection = async(subSectionId,sectionId) => {
    const formData = new FormData();
    formData.append("subSectionId",subSectionId);
    formData.append("sectionId",sectionId);

    setLoading(true);
    const result = await deleteSubSection(formData,token);
    if(result){
      const updatedCourseContent = course.courseContent.map((section) =>
                section._id === sectionId ? result : section
            )
            const updatedCourse = { ...course, courseContent: updatedCourseContent }
            dispatch(setCourse(updatedCourse))
    }
    setLoading(false);
    setConfirmationModal(null);
  }

  return (
    <div>
      <div className="bg-richblack-700 p-4 rounded-md cursor-pointer    ">
        {
          course.courseContent.map((section) => (
            <div>
              <details key={section._id} open>
                <summary>
                  <div className="flex flex-col gap-2 py-2 cursor-pointer border-b-2 border-b-richblack-600">
                    <div className="flex justify-between items-center ">

                      <div className="text-richblack-50 gap-2 flex items-center">
                        <RxDropdownMenu className="text-[20px]" />
                        <p className="text-richblack-50 font-semibold">{section.sectionName}</p>
                      </div>

                      <div className="flex gap-2 text-richblack-50 items-center">

                        <div onClick={() => { handleChangeEditSectionName(section._id, section.sectionName) }}>
                          <MdModeEditOutline />
                        </div>

                        <div onClick={() => {
                          setConfirmationModal(
                            {
                              text1: "Are you sure you want to delete this section",
                              text2: "All the subsections in this section will also be deleted",
                              btn1Text: "Delete",
                              btn2Text: "Cancel",
                              btn1Handler: () => handleDeleteSection(section._id),
                              btn2Handler: () => setConfirmationModal(null),
                            }
                          )
                        }}>
                          <RiDeleteBin6Line />
                        </div>

                        <div className="flex items-center">
                          <span>|</span>
                        </div>

                        <div>
                          <FaCaretDown />
                        </div>

                      </div>

                    </div>
                  </div>
                </summary>


                <div className="w-[90%] px-6 py-3 mx-auto">
                  {
                    section.subSection.map((data) => (
                      <div className="flex flex-col gap-2">

                        <div className="flex items-center justify-between">
                          <div className="text-richblack-50 gap-2 flex items-center" onClick={() => { setViewSubSection(data) }}>
                            <RxDropdownMenu className="text-[20px]" />
                            <p className="text-richblack-50 font-semibold">{data.title}</p>
                          </div>

                          <div className="flex items-center gap-2">

                            <div className="text-richblack-50" onClick={() => { setEditSubSection({ ...data, sectionId: section._id }) }}>
                              <MdModeEditOutline />
                            </div>

                            <div className="text-richblack-50" onClick={() => {
                              setConfirmationModal(
                                {
                                  text1: "Are you sure you want to delete this subsection",
                                  text2: "the lecture in this subsection will also be deleted",
                                  btn1Text: "Delete",
                                  btn2Text: "Cancel",
                                  btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                  btn2Handler: () => setConfirmationModal(null),
                                }
                              )
                            }}>
                              <RiDeleteBin6Line />
                            </div>

                          </div>
                        </div>

                      </div>
                    ))
                  }
                </div>

                <div className="flex items-center gap-2 text-yellow-50 font-semibold w-[90%] mx-auto"
                     onClick={()=>setAddSubSection(section._id)}>
                    <FaPlus/>
                    <p>Add Lecture</p>
                </div>

              </details>
            </div>
          ))
        }
      </div>

      <div>
        {
          addSubSection && <SubSectionModal
            modalData={addSubSection}
            setModalData={setAddSubSection}
            add={true}
          />
        }
        {
          editSubSection && <SubSectionModal
            modalData={editSubSection}
            setModalData={setEditSubSection}
            edit={true}
          />
        }
        {
          viewSubSection && <SubSectionModal
            modalData={viewSubSection}
            setModalData={setViewSubSection}
            view={true}
          />
        }

        {
          confirmationModal && <ConfirmationModal modalData={confirmationModal} />
        }
      </div>
    </div>
  )
}

export default NestedView
