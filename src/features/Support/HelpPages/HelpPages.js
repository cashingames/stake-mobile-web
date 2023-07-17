import React from 'react'
import { IoChevronForward, IoChevronForwardOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader';
import { logoutUser } from '../../Auth/AuthSlice';
import './HelpPages.scss'
import AppHeader from '../../../components/AppHeader/AppHeader';

function HelpPages() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logoutUser())
  }

  const navigateHandler = () => {
    navigate('/dashboard')
  }

  return (
    <>
      <ScreenHeader title='Help' styleProp='supportHeader' iconProp='help-back' onClick={navigateHandler} />
      <div className='helpPage-container'>
        <div className='profile-tabs'>
          <HelpTab tabName='Contact Us' onClick={() => navigate('/contact-us')} />
          <HelpTab tabName='FAQs' onClick={() => navigate('/support')} />
        </div>

        <div className='container-logout'>
          <a href='https://wa.me/2348025116306' className='whatsapp-chat'>
            <img width="50px" height="50px" src="/images/whatsapp-icon.png" alt="logo" className="social-img" />
            <div className='text-container'>
              <div className='header-container'>
                <span className='header'>Contact Support</span>
                <IoChevronForward color='#072169' />
              </div>
              <span className='whatsapp-title'>Live chat with support on Whatsapp</span>
            </div>
          </a>
          <p className="logout-text" onClick={onLogout}>Logout</p>
        </div>
      </div>
      <AppHeader heading='Games' style={{ color: '#000000' }} />

    </>
  )
}

export default HelpPages;

function HelpTab({ tabName, onClick }) {
  return (
    <div className='tabContainer' onClick={onClick}>
      <p className='tabText'>{tabName}</p>
      <IoChevronForwardOutline size={20} color="#524D4D" />
    </div>
  )
}