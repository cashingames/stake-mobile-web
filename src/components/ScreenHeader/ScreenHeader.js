import React from 'react'
import { IoChevronBack } from 'react-icons/io5'
import './ScreenHeader.scss'

function ScreenHeader({ title, styleProp, iconProp, onClick }) {
  return (
    <div className={`screenHeader ${styleProp}`}>
      <IoChevronBack className={`icon ${iconProp}`}
        onClick={onClick} />
      <p className='title'>{title}</p>
      <div></div>
    </div>
  )
}

export default ScreenHeader