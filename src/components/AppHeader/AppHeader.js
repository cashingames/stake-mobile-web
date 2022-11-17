import * as React from 'react';
import { IoWalletOutline, IoNotificationsOutline, IoHomeOutline, IoMenuSharp } from "react-icons/io5";
import AuthTitle from '../AuthTitle/AuthTitle'
import './AppHeader.scss'

const AppHeader = () => {
  return(
    <div className='appHeaderContainer'>
      <div className='appHeaderTitle'>
        <IoMenuSharp className='icon' />
        <AuthTitle  titleText='Home' styleProp='title'/>
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
            <p>90</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppHeader