import * as React from 'react';
import { IoWalletOutline, IoNotificationsOutline, IoHomeOutline, IoMenuSharp } from "react-icons/io5";
import { useSelector } from 'react-redux';
import AuthTitle from '../AuthTitle/AuthTitle'
import './AppHeader.scss'

const AppHeader = ({heading}) => {
  const user = useSelector(state => state.auth.user);

  return (
    <div className='appHeaderContainer'>
      <div className='appHeaderTitle'>
        <IoMenuSharp className='icon' />
        <h1 className='title'>{heading}</h1>
        {/* <AuthTitle  titleText='Home' styleProp='title'/> */}
      </div>
      <div className='navlinks'>
        <div className='navlink'>
          <IoHomeOutline className='icon' />
          <p className='text'>home</p>
        </div>
        <div className='navlink'>
          <IoWalletOutline className='icon' />
          <p className='text'>wallet</p>
        </div>
        <div className='notification'>
          <IoNotificationsOutline className='notifyIcon' />
          {user.unreadNotificationsCount !== 0 &&
            <div className='notificationNumber'>
              <p>{user.unreadNotificationsCount}</p>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default AppHeader