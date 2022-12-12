import React from 'react'
import { IoArrowBack } from 'react-icons/io5'
import './ProfileScreensHeader.scss'

function ProfileScreensHeader({ title, styleProp, iconProp, handleNavigation }) {
  return (
    <div className={`profileScreenHeader ${styleProp}`}>
      <IoArrowBack className={`icon ${iconProp}`}
        onClick={handleNavigation} />
      <h1 className='title'>{title}</h1>
    </div>
  )
}

export default ProfileScreensHeader