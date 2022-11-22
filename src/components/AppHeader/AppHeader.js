import * as React from 'react';
import { IoWalletOutline, IoNotificationsOutline, IoHomeOutline, IoMenuSharp } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './AppHeader.scss'

const AppHeader = ({ heading }) => {
  let navigate = useNavigate();

  const user = useSelector(state => state.auth.user);

  const goToWallet = () => {
    navigate('/wallet')
  }
  const goToDashboard = () => {
    navigate('/dashboard')
  }
  const goToNotifications = () => {
    navigate('/notifications')
  }

  return (
    <div className='appHeaderContainer'>
      <div className='appHeaderTitle'>
        <IoMenuSharp className='icon' />
        <h1 className='title'>{heading}</h1>
      </div>
      <div className='navlinks'>
        <div className='navlink' onClick={goToDashboard}>
          <IoHomeOutline className='icon' />
          <p className='text'>home</p>
        </div>
        <div className='navlink' onClick={goToWallet}>
          <IoWalletOutline className='icon' />
          <p className='text'>wallet</p>
        </div>
        <div className='notification' onClick={goToNotifications}>
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