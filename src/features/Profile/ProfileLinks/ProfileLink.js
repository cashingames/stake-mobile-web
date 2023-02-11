import React from 'react'
import { Link } from 'react-router-dom';
import { IoChevronForwardOutline } from 'react-icons/io5'
import './ProfileLink.scss'
function ProfileLink() {
  return (
    <div className='profileLinkContainer'>
        <Link to='/edit-profile' className='profileLink'>
            <p className='profileLinkLabel'>Edit Details</p>
            <IoChevronForwardOutline  className='icon'/>
        </Link>
        <Link to='/change-password' className='profileLink'>
            <p className='profileLinkLabel'>Change Password</p>
            <IoChevronForwardOutline  className='icon'/>
        </Link>
        {/* <Link to='/stat' className='profileLink'>
            <p className='profileLinkLabel'>Stats</p>
            <IoChevronForwardOutline  className='icon'/>
        </Link> */}
        <Link to='/bank-details' className='profileLink'>
            <p className='profileLinkLabel'>Bank Details</p>
            <IoChevronForwardOutline  className='icon'/>
        </Link>
    </div>
  )
}

export default ProfileLink