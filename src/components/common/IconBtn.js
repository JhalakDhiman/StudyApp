import React from 'react'

const IconBtn = ({onclick,disabled,children,bgcolor,textcolor}) => {
  return (
    <button
    disabled={disabled}
    onClick={onclick}
    className={`bg-${bgcolor} p-2 px-4 rounded-md text-${textcolor} font-semibold`}>
        {
           children
        }
    </button>
  )
}

export default IconBtn
