import React from 'react';
import {useSelector} from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader';
import './UserProfileScreen.scss'
import ProfileLink from '../ProfileLinks/ProfileLink';
import { IoCameraSharp } from 'react-icons/io5';

function UserProfileScreen() {
    const user = useSelector(state => state.auth.user)

    
    return (
        <>
            <ScreenHeader title='Profile'/>
            <div className='userProfileContainer'>
                <div className='userImgContainer'>
                    <img src={
                            user.avatar ? user.avater :'/images/user-icon.png'
                        }
                        alt='user'
                        className='userAvater'/>
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
