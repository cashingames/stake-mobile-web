import React from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import './ScreenHeader.scss'

function ScreenHeader({ title, styleProp, iconProp }) {
  const navigate = useNavigate()
  return (
    <div className={`screenHeader ${styleProp}`}>
      <IoArrowBack className={`icon ${iconProp}`}
        onClick={
          () => navigate(-1)
        } />
      <p className='title'>{title}</p>
    </div>
  )
}

export default ScreenHeader