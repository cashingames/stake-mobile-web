import * as React from 'react';
import { IoHome, IoGameController, IoHelpCircle, IoMail } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import './AppHeader.scss'

const AppHeader = ({ backgroundColor }) => {

  return (
    <div className='appHeaderContainer' style={{backgroundColor:{backgroundColor}}}>
      <NavLink to='/dashboard' className='navlink'>
        <IoHome className='icon' color='#072169' />
        Home
      </NavLink>
      <NavLink to='/games-list' className='navlink'>
        <IoGameController className='icon' color='#072169' />
        Games
      </NavLink>
      <NavLink to='/help' className='navlink'>
        <IoHelpCircle className='icon' color='#072169' />
        Help
      </NavLink>
      <NavLink to='/notifications' className='navlink'>
        <IoMail className='icon' color='#072169' />
        Notifications
      </NavLink>
    </div>
  )
}

export default AppHeader