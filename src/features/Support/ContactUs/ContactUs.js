import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import ContactForm from '../../../components/ContactForm/ContactForm'
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader'
import './ContactUs.scss'

function ContactUs() {
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.user);
  const navigationHandler = () => {
    navigate('/help')
  }
  return (
    <>
      <ScreenHeader title='Contact Us' styleProp='contactUs-header' onClick={navigationHandler}/>
      <div className='contactUs-container'>
        <p className='title'>Do you have any question?</p>
        <ContactForm user={user} />
      </div>
    </>
  )
}

export default ContactUs