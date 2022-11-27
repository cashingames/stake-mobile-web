import * as React from 'react';
import { IoWalletOutline, IoNotificationsOutline, IoHomeOutline, IoMenuSharp } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DrawerNavigation from '../DrawerNavigation';
import './AppHeader.scss'

const AppHeader = ({ heading }) => {

  const [open, setOpen] = React.useState(false);

  const handleOpenDrawer = () => {
    setOpen(true)
  }

  const handleCloseDrawer = () => {
    setOpen(false)
  }


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
    <>
    <div className='appHeaderContainer'>
      <div className='appHeaderTitle'>
        <IoMenuSharp className='icon' onClick={handleOpenDrawer}/>
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
    <DrawerNavigation open={open} closeDrawer={handleCloseDrawer} />
    </>
  )
}

export default AppHeader