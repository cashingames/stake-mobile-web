import React from 'react'
import { Link } from 'react-router-dom'
import { IoChevronForwardOutline } from 'react-icons/io5'
import './DrawerItems.scss'
import { useSelector } from 'react-redux';

function DrawerItems() {
    const user = useSelector(state => state.auth.user);
    return (
        <>
            <Link to="/notifications" className='drawerItem'><p className='labelItem'>
                Notifications
            </p>
                <div className='notificationSection'>
                    {
                        user.unreadNotificationsCount !== 0 && <div className='notificationNumberCase'>
                            <p className='notificationNumber'>{
                                user.unreadNotificationsCount
                            }</p> </div>}
                    <IoChevronForwardOutline className='notifyIcon' />
                </div>
            </Link>

            <Link to="/live-trivia" className='drawerItem'><p className='labelItem'>
                Live Trivia
            </p>
                <IoChevronForwardOutline className='icon' />
            </Link>

            <Link to="/dashboard" className='drawerItem'><p className='labelItem'>
                My Challenges
            </p>
                <IoChevronForwardOutline className='icon' />
            </Link>

            <Link to="/store" className='drawerItem'><p className='labelItem'>
                Store
            </p>
                <IoChevronForwardOutline className='icon' />
            </Link>

            <Link to="/invite-friends" className='drawerItem'><p className='labelItem'>
                Invite Friends
            </p>
                <IoChevronForwardOutline className='icon' />
            </Link>

            <Link to="/dashboard" className='drawerItem'><p className='labelItem'>
                Help
            </p>
                <IoChevronForwardOutline className='icon' />
            </Link>
            <div className='versionContainer'>
                <p className="appVersion">App version 1.0.68</p>
            </div>
        </>
    )
}

export default DrawerItems