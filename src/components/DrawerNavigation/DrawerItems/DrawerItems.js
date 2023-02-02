import React from 'react'
import { Link } from 'react-router-dom'
import { logoutUser } from '../../../features/Auth/AuthSlice';
import { IoChevronForwardOutline } from 'react-icons/io5'
import './DrawerItems.scss'
import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';

function DrawerItems() {
    // const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logoutUser())
    }

    return (
        <>
            {/* <Link to="/notifications" className='drawerItem'><p className='labelItem'>
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
            </Link> */}

            {/* <Link to="/live-trivia" className='drawerItem'><p className='labelItem'>
                Live Trivia
            </p>
                <IoChevronForwardOutline className='icon' />
            </Link> */}
{/* 
            <Link to="/challenges" className='drawerItem'><p className='labelItem'>

                My Challenges
            </p>
                <IoChevronForwardOutline className='icon' />
            </Link> */}

            <Link to="/store" className='drawerItem'><p className='labelItem'>
                Buy Boosts
            </p>
                <IoChevronForwardOutline className='icon' />
            </Link>
{/* 
            <Link to="/leaderboards" className='drawerItem'><p className='labelItem'>
                Leaderboards
            </p>
                <IoChevronForwardOutline className='icon' />
            </Link> */}
              <Link to="/invite-friends" className='drawerItem'><p className='labelItem'>
                Invite Friends
            </p>
                <IoChevronForwardOutline className='icon' />
            </Link>

            <Link to="/help" className='drawerItem'><p className='labelItem'>
                Get Help
            </p>
                <IoChevronForwardOutline className='icon' />
            </Link>

            <div className='container-logout'>
                <p className="logout-text" onClick={onLogout}>Logout</p>
            </div>
        </>
    )
}

export default DrawerItems