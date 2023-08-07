import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import ContactForm from '../../../components/ContactForm/ContactForm'
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader'
import { getUser } from '../../Auth/AuthSlice';
import LoaderScreen from '../../LoaderScreen/LoaderScreen';
import './ContactUs.scss'
import { IoChevronForward } from 'react-icons/io5';

function ContactUs() {
  const [screenLoader, setScreenLoader] = useState(true)
  const dispatch = useDispatch();

  const navigate = useNavigate()
  const user = useSelector(state => state.auth.user);
  const navigationHandler = () => {
    navigate('/dashboard')
  }


  useEffect(() => {
    dispatch(getUser()).then(() => { setScreenLoader(false) });
  }, [dispatch])


  if (screenLoader) {
    return <LoaderScreen backgroundColor="loader" />
  }
  return (
    <>
      <div className='contactUs-container'>
      <ScreenHeader title='Contact Us' styleProp='contactUs-header' iconProp='contact-back' onClick={navigationHandler} />
        <p className='title-question'>Do you have any question?</p>
        <ContactForm user={user} />
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
      </div>
    </>
  )
}

export default ContactUs