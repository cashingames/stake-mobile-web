import * as React from 'react';
import { IoWalletOutline, IoNotificationsOutline, IoHomeOutline, IoMenuSharp } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
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

  const user = useSelector(state => state.auth.user);
  return (
    <>
      <div className='appHeaderContainer'>
        <div className='appHeaderTitle'>
          <IoMenuSharp className='icon'
            onClick={handleOpenDrawer} />
          <p className='title'>
            {heading}</p>
        </div>
        <div className='navlinks'>
          <NavLink to='/dashboard' className='navlink'>
            <IoHomeOutline className='icon' />
            home
          </NavLink>
          <NavLink to='/wallet' className='navlink'>
            <IoWalletOutline className='icon' />
            wallet
          </NavLink>
          <NavLink to='/notifications' className='notification'>
            <IoNotificationsOutline className='notifyIcon' /> {
              user.unreadNotificationsCount !== 0 && <div className='notificationNumberCase'>
                <p className='notificationNumber'>{
                  user.unreadNotificationsCount
                }</p>
              </div>
            } </NavLink>
        </div>
      </div>
      <DrawerNavigation open={open}
        closeDrawer={handleCloseDrawer} />
    </>
  )
}

export default AppHeader