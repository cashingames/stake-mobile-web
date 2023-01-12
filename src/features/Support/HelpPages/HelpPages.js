import React from 'react'
import { IoChevronForwardOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router';
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader';
import './HelpPages.scss'

function HelpPages() {
    const navigate = useNavigate();

    const navigateHandler = () => {
        navigate('/dashboard')
      }
    
  return (
    <>
        <ScreenHeader title='Support' styleProp='supportHeader' onClick={navigateHandler} />
        <div className='helpPage-container'>
            <div className='profile-tabs'>
            <HelpTab  tabName='FAQs' onClick={() => navigate('/support')}/>
            <HelpTab  tabName='Contact Us' onClick={() => navigate('/contact-us')}/>
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