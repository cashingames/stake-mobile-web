import React from 'react'
import './DrawerHeader.scss'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const backendUrl = process.env.REACT_APP_API_ROOT_URL;


function DrawerHeader() {

  const user = useSelector(state => state.auth.user)
  return (
    <div className='drawerHeader'>
      <div className='avatar'>
        <img src={user.avatar  ? `${backendUrl}/${user.avatar }` : "/images/user-icon.png"} alt='user' />                   
      </div>
      <p className='userTitle'>
        {user.fullName}
      </p>
      <p className='nickName'>
        @{user.username}
      </p>
      <Link to='/profile' className='profile'>
        <p className='profileText'>View Profile</p>
      </Link>
    </div>
    )
}

export default DrawerHeader