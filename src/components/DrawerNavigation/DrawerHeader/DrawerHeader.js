import React from 'react'
import { Person } from '@mui/icons-material';
import './DrawerHeader.scss'

function DrawerHeader() {
  return (
    <div className='drawerHeader'>
      <div className='avatar'>
        <Person />
      </div>
      <p className='userTitle'>
        Ufuoma Ererobe
      </p>
      <p className='nickName'>
        @Johndoe
      </p>
      <div className='profile'>
        <p className='profileText'>View Profile</p>
      </div>
    </div>
    )
}

export default DrawerHeader