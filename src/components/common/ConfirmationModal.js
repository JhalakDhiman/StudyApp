import React from 'react'
import IconBtn from './IconBtn'

const ConfirmationModal = ({modalData}) => {
  return (
    <div className="fixed   inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
        <div className="flex flex-col gap-5 bg-richblack-900 rounded-lg p-3 border-[1px] border-richblack-500 ">
            <div className="flex flex-col gap-3">
                <p className="text-richblack-5 font-semibold text-[19px]">{modalData.text1}</p>
                <p className="text-richblack-5">{modalData.text2}</p>
            </div>
            <div className="flex gap-3">
                <IconBtn onclick={modalData.btn1Handler} bgcolor={'yellow-50'} textcolor={'richblack-900'} disabled={false} >
                    {modalData.btn1Text}
                </IconBtn>
                <IconBtn onclick={modalData.btn2Handler} bgcolor={'richblack-600'} textcolor={'richblack-25'} disabled={false} >
                    {modalData.btn2Text}
                </IconBtn>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal
