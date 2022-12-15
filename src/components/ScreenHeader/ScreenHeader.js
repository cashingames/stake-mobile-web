import React from 'react'
import { IoArrowBack } from 'react-icons/io5'
import './ScreenHeader.scss'

function ScreenHeader({ title, styleProp, iconProp, onClick }) {
  return (
    <div className={`screenHeader ${styleProp}`}>
      <IoArrowBack className={`icon ${iconProp}`}
        onClick={onClick} />
      <p className='title'>{title}</p>
    </div>
  )
}

export default ScreenHeader