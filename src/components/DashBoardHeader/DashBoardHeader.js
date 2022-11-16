import { Avatar } from '@mui/material';
import * as React from 'react';
import { FaBars, FaHome } from 'react-icons/fa'
import { IoWalletOutline, IoNotificationsOutline, IoHomeOutline, IoMenuSharp } from "react-icons/io5";
import AuthTitle from '../AuthTitle/AuthTitle'
import './DashBoardHeader.scss'

const DashBoardHeader = () => {
  return(
    <div className='dashboardContainer'>
      <div className='dashboardTitle'>
        <IoMenuSharp className='icon' />
        <AuthTitle  titleText='Home'/>
      </div>
      <div className='navlinks'>
        <div className='navlink'>
          <IoHomeOutline className='icon'/>
          <p className='text'>home</p>
        </div>
        <div className='navlink'>
          <IoWalletOutline className='icon'/>
          <p className='text'>wallet</p>
        </div>
        <div className='notification'>
          <IoNotificationsOutline className='notifyIcon'/>
          <div className='notificationNumber'>
            <p>1234</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoardHeader