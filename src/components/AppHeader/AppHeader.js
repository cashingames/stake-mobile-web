import * as React from 'react';
import { IoGameController, IoHelpCircle, IoMail } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import './AppHeader.scss'

const AppHeader = ({ backgroundColor }) => {

  return (
    <div className='appHeaderContainer' style={{ backgroundColor: { backgroundColor } }}>
      <NavLink to='/dashboard' className='navlink'>
        {/* <IoHome className='icon' color='#1C453B' size="32" title='Home' /> */}
        <HomeIcon fontSize='large' />
        Home
      </NavLink>
      <NavLink to='/games-list' className='navlink'>
        <IoGameController className='icon' color='#1C453B' size="32" title='Games' />
        Games
      </NavLink>
      <NavLink to='/contact-us' className='navlink'>
        <IoHelpCircle className='icon' color='#1C453B' size="32" title='Contact Us' />
        Contact
      </NavLink>
      <NavLink to='/notifications' className='navlink'>
        <IoMail className='icon' color='#1C453B' size="32" title='Notifications' />
        Notifications
      </NavLink>

    </div>
  )
}

export default AppHeader