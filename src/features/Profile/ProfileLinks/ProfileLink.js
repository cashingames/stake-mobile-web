import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './ProfileLink.scss'
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../Auth/AuthSlice';
function ProfileLink() {
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const onLogout = () => {
        dispatch(logoutUser());
        navigation('/login')
      }
    return (
        <div style={{ marginTop: '2rem' }}>
            <div className='profileLinkContainer'>
                <Link to='/edit-profile' className='profileLink'>
                    <div className='profile-link-icon'>
                        <img
                            src="/images/single-player.png"
                            alt='bio'
                            className='bio-icon'
                        />
                    </div>
                    <p className='profileLinkLabel'>Bio Data</p>
                </Link>
                <Link to='/notifications' className='profileLinkI'>
                    <div className='profile-link-icon'>
                        <img
                            src="/images/bell-dynamic-color.png"
                            alt='bio'
                            className='bio-icon'
                        />
                    </div>
                    <p className='profileLinkLabel'>Notification</p>
                </Link>
                <Link to='/wallet' className='profileLink'>
                    <div className='profile-link-icon'>
                        <img
                            src="/images/wallet-dynamic-color.png"
                            alt='bio'
                            className='bio-icon'
                        />
                    </div>
                    <p className='profileLinkLabel'>Wallet</p>
                </Link>
            </div>
            <div className='profileLinkContainer'>
                <Link to='/support' className='profileLink'>
                    <div className='profile-link-icon'>
                        <img
                            src="/images/file-dynamic-color.png"
                            alt='bio'
                            className='bio-icon'
                        />
                    </div>
                    <p className='profileLinkLabel'>FAQ</p>
                </Link>
                <Link to='/contact-us' className='profileLinkI'>
                    <div className='profile-link-icon'>
                        <img
                            src="/images/mail-dynamic-color.png"
                            alt='bio'
                            className='bio-icon'
                        />
                    </div>
                    <p className='profileLinkLabel'>Contact Us</p>
                </Link>

                <Link to='/invite-friends' className='profileLink'>
                    <div className='profile-link-icon'>
                        <img
                            src="/images/link-dynamic-color.png"
                            alt='bio'
                            className='bio-icon'
                        />
                    </div>
                    <p className='profileLinkLabel'>Invite</p>
                </Link>
            </div>
            <div className='profileLinkContainerI'>
                <Link to='/change-password' className='profileLink'>
                    <div className='profile-link-icon'>
                        <img
                            src="/images/key-dynamic-color.png"
                            alt='bio'
                            className='bio-icon'
                        />
                    </div>
                    <p className='profileLinkLabel'>Change Password</p>
                </Link>

            </div>
            <button className='out-container' onClick={onLogout}>
                <span className='buttonText'>Logout</span>
            </button>
        </div>
    )
}

export default ProfileLink