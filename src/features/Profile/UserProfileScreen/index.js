import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import './UserProfileScreen.scss'
import ProfileLink from '../ProfileLinks/ProfileLink';
import { IoCameraSharp } from 'react-icons/io5';
import ScreensHeader from '../../../components/ScreenHeader/ScreenHeader';

const backendUrl = process.env.REACT_APP_API_ROOT_URL;

function UserProfileScreen() {
    const user = useSelector(state => state.auth.user)
    const navigate = useNavigate();

    const navigateHandler = () => {
        navigate('/dashboard')
    }

    //disable browser back button
    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    })

    return (
        <>
            <ScreensHeader title='Profile' onClick={navigateHandler} />
            <div className='userProfileContainer'>
                <div className='userImgContainer'>
                    <img
                        src={user.avatar ? `${backendUrl}/${user.avatar}` : "/images/user-icon.png"}
                        alt='user'
                        className='userAvater' />
                    <div className='cameraCase'>
                        <IoCameraSharp className='icon'
                        />
                    </div>
                </div>
                <ProfileLink />
            </div>
        </>
    )
}

export default UserProfileScreen
