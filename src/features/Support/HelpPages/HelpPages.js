import React from 'react'
import { IoChevronForwardOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader';
import { logoutUser } from '../../Auth/AuthSlice';
import './HelpPages.scss'

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
      <ScreenHeader title='Support' styleProp='supportHeader' onClick={navigateHandler} />
      <div className='helpPage-container'>
        <div className='profile-tabs'>
          <HelpTab tabName='Contact Us' onClick={() => navigate('/contact-us')} />
          <HelpTab tabName='FAQs' onClick={() => navigate('/support')} />
        </div>
        <div className='container-logout'>
          <p className="logout-text" onClick={onLogout}>Logout</p>
        </div>
      </div>
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