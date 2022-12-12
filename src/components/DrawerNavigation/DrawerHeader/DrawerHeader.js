import React from 'react'
import { Person } from '@mui/icons-material';
import './DrawerHeader.scss'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function DrawerHeader() {

  const user = useSelector(state => state.auth.user)
  return (
    <div className='drawerHeader'>
      <div className='avatar'>
        {user.avatar ? <img src={user.avatar} alt='user' /> :
        <Person />}
      </div>
      <p className='userTitle'>
        {user.fullName}
      </p>
      <p className='nickName'>
        {user.username}
      </p>
      <Link to='/profile' className='profile'>
        <p className='profileText'>View Profile</p>
      </Link>
    </div>
    )
}

export default DrawerHeader